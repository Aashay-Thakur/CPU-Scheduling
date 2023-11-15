import logProcessStatus from "./log.js";

function processData(data) {
	[...new Set(data)].map((process, index) => {
		process[1].startTime = process[1].preEmptData.startTime[0];
		process[1].endTime = process[1].preEmptData.endTime[process[1].preEmptData.endTime.length - 1];
		process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
		process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime;
		process[1].pid = process[0].slice(1);
		process[1].order = index + 1;
		process[1].responseTime = process[1].startTime - process[1].arrivalTime;
	});
	return data;
}

export default function priorityPE(processes, options) {
	const isReverse = options.reverse;

	var sortable = [];
	for (let process in processes) {
		sortable.push([
			process,
			{
				...processes[process],
				operationalBurstTime: processes[process].burstTime,
				preEmptData: { startTime: [], endTime: [], executionTime: [] },
			},
		]);
	}

	var processedData = [];
	var readyQueue = [];
	var current_time = 0;
	var operationalArray = sortable;
	var FAILSAFE = 200;
	var quantum = options.quantum;
	var logs = [];

	// This function returns the processes that have arrived at the current time
	function processArrived(time) {
		let returnArray = operationalArray.filter((process) => process[1].arrivalTime === time);
		operationalArray = operationalArray.filter((process) => process[1].arrivalTime !== time);
		returnArray.sort((a, b) => a[0] - b[0]);
		returnArray.map((process) => logs.push([time, { process: process[0], status: "arrived" }]));
		if (operationalArray.length == 0) logs.push([time, { status: "allArrived" }]);
		return returnArray;
	}

	function sortByPriority(array) {
		return array.sort((a, b) => {
			return !isReverse ? a[1].priority - b[1].priority : b[1].priority - a[1].priority;
		});
	}

	while (true && --FAILSAFE > 0) {
		if (operationalArray.length !== 0) {
			let arrivedProcesses = processArrived(current_time);
			readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
		}

		if (readyQueue.length !== 0) {
			let currentExecutionTime = 0;
			let currentProcess = readyQueue.shift();
			currentProcess[1].preEmptData.startTime.push(current_time);
			processedData.push(currentProcess);
			logs.push([current_time, { process: currentProcess[0], status: "started" }]);

			while (currentProcess[1].operationalBurstTime >= 0 && --FAILSAFE > 0) {
				if (operationalArray.length !== 0) {
					let arrivedProcesses = processArrived(current_time);
					readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
				}

				if (currentProcess[1].operationalBurstTime == 0) {
					currentProcess[1].preEmptData.endTime.push(current_time);
					currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
					logs.push([current_time, { process: currentProcess[0], status: "completed" }]);
					break;
				} else if (readyQueue.length !== 0) {
					if (
						(!isReverse && readyQueue[0][1].priority < currentProcess[1].priority) ||
						(isReverse && readyQueue[0][1].priority > currentProcess[1].priority)
					) {
						currentProcess[1].preEmptData.endTime.push(current_time);
						currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
						readyQueue.push(currentProcess);
						logs.push([
							current_time,
							{
								process: currentProcess[0],
								status: "preempted",
								currentExecutionTime,
								reason: `Higher priority Process ${readyQueue[0][0]} arrived`,
							},
						]);
						break;
					}
					/*
					* Here we check if the next process in ready queue
					* has the same priority as the current process
					* if so, check check if the current process's execution time
					* is a multiple of the quantum time
					? This can be explained with a small example
					* if the quantum time is 2, and the current process has been running for 5 units
					* then 5 % 2 = 1, that means the process need one more unit to complete the quantum time again.
					* if current execution was 6, 6 % 2 == 0, that means the process has completed the quantum time
					* and needs to be preempted
					*/
					if (
						readyQueue[0][1].priority == currentProcess[1].priority &&
						currentExecutionTime > 0 &&
						currentExecutionTime % quantum == 0
					) {
						currentProcess[1].preEmptData.endTime.push(current_time);
						currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
						readyQueue = [
							...readyQueue.filter((process) => process[1].priority == currentProcess[1].priority),
							currentProcess,
							...readyQueue.filter((process) => process[1].priority != currentProcess[1].priority),
						];
						logs.push([
							current_time,
							{
								process: currentProcess[0],
								status: "preempted",
								currentExecutionTime,
								reason: "Quantum time up",
							},
						]);
						break;
					}
				}
				currentExecutionTime++;
				currentProcess[1].operationalBurstTime--;
				current_time++;
				logs.push([current_time, { process: currentProcess[0], status: "running", currentExecutionTime }]);
			}
		} else {
			if (operationalArray.length == 0) {
				logs.push([current_time, { status: "allCompleted" }]);
				break;
			}
			logs.push([current_time, { status: "idle" }]);
			current_time++;
		}
	}
	logProcessStatus(logs);
	return processData(processedData);
}
