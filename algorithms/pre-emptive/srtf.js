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

export default function srtf(processes) {
	logProcessStatus("CPu", 0, "clear");

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

	function processArrived(time) {
		let returnArray = operationalArray.filter((process) => process[1].arrivalTime === time);
		operationalArray = operationalArray.filter((process) => process[1].arrivalTime !== time);
		returnArray.sort((a, b) => a[0] - b[0]);
		returnArray.map((process) => logProcessStatus(process[0], time, "arrived"));
		if (operationalArray.length == 0) logProcessStatus("CPU", time, "allArrived");
		return returnArray;
	}

	function sortByRemainingTime(array) {
		return array.sort((a, b) => {
			return a[1].operationalBurstTime - b[1].operationalBurstTime;
		});
	}

	while (true && --FAILSAFE > 0) {
		if (operationalArray.length !== 0) {
			let arrivedProcesses = processArrived(current_time);
			readyQueue = [...readyQueue, ...arrivedProcesses];
		}
		readyQueue = sortByRemainingTime(readyQueue);

		if (readyQueue.length !== 0) {
			let currentExecutionTime = 0;
			let currentProcess = readyQueue.shift();
			currentProcess[1].preEmptData.startTime.push(current_time);
			processedData.push(currentProcess);
			logProcessStatus(currentProcess[0], current_time, "started");

			while (currentProcess[1].operationalBurstTime >= 0 && --FAILSAFE > 0) {
				if (operationalArray.length !== 0) {
					let arrivedProcesses = processArrived(current_time);
					readyQueue = sortByRemainingTime([...readyQueue, ...arrivedProcesses]);
				}

				if (currentProcess[1].operationalBurstTime == 0) {
					currentProcess[1].preEmptData.endTime.push(current_time);
					currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
					logProcessStatus(currentProcess[0], current_time, "completed");
					break;
				} else if (readyQueue.length !== 0) {
					if (readyQueue[0][1].operationalBurstTime < currentProcess[1].operationalBurstTime) {
						currentProcess[1].preEmptData.endTime.push(current_time);
						currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
						readyQueue.push(currentProcess);
						logProcessStatus(
							currentProcess[0],
							current_time,
							"preempted",
							currentExecutionTime,
							`Shorter Job ${readyQueue[0][0]} Arrived`
						);
						break;
					}
				}
				currentExecutionTime++;
				currentProcess[1].operationalBurstTime--;
				current_time++;
				logProcessStatus(
					currentProcess[0],
					current_time,
					"running",
					currentExecutionTime,
					"Remaining Time: " + currentProcess[1].operationalBurstTime
				);
			}
		} else {
			if (operationalArray.length == 0) {
				logProcessStatus("CPU", current_time, "allCompleted");
				break;
			}
			logProcessStatus("CPU", current_time, "idle");
			current_time++;
		}
	}
	return processData(processedData);
}
