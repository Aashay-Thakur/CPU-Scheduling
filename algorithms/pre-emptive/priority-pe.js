import logProcessStatus from "./log.js";
import createTable from "../../createTable.js";
import createChart from "../../createChart.js";

export default function priorityPE(processes, options) {
	logProcessStatus("CPu", 0, "clear");
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
	var chartData = [];
	var readyQueue = [];
	var current_time = 0;
	var operationalArray = sortable;
	var FAILSAFE = 200;
	var quantum = options.quantum;

	// This function returns the processes that have arrived at the current time
	function processArrived(time) {
		let returnArray = operationalArray.filter((process) => process[1].arrivalTime === time);
		operationalArray = operationalArray.filter((process) => process[1].arrivalTime !== time);
		returnArray.sort((a, b) => a[0] - b[0]);
		returnArray.map((process) => logProcessStatus(process[0], time, "arrived"));
		if (operationalArray.length == 0) logProcessStatus("CPU", time, "allArrived");
		return returnArray;
	}

	// this function sorts the ready queue by priority
	function sortByPriority(array) {
		return array.sort((a, b) => {
			// if the reverse option is selected, sort in reverse order
			// else sort in ascending order
			return !isReverse ? a[1].priority - b[1].priority : b[1].priority - a[1].priority;
		});
	}

	// This function calculates the turnaround time, waiting time, etc
	function processData() {
		[...new Set(processedData)].map((process, index) => {
			process[1].startTime = process[1].preEmptData.startTime[0];
			process[1].endTime = process[1].preEmptData.endTime[process[1].preEmptData.endTime.length - 1];
			process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
			process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime;
			process[1].pid = process[0].slice(1);
			process[1].order = index + 1;
			process[1].responseTime = process[1].startTime - process[1].arrivalTime;

			// let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
			let colors = [
				"#36a2eb",
				"#ff6384",
				"#ff9f40",
				"#4bc0c0",
				"#9966ff",
				"#ffcd56",
				"#c9cbcf",
				"#b00004",
				"#2d5a6a",
				"#65af50",
			];

			process[1].preEmptData.startTime.map((time, i) => {
				chartData.push({
					label: process[0],
					data: [
						{
							x: time,
							// y: process[1].pid,
							y: 0,
						},
						{
							x: process[1].preEmptData.endTime[i],
							// y: process[1].pid,
							y: 0,
						},
					],
					backgroundColor: colors[index],
					borderColor: colors[index],
				});
			});
		});

		createChart(chartData, "(Pre-emptive) Priority");

		createTable(
			[...new Set(processedData)].sort((a, b) => a[1].pid - b[1].pid),
			"Priority",
			true
		);
	}

	// This is the main logic of the algorithm
	while (true && --FAILSAFE > 0) {
		// if there are processes remaining
		if (operationalArray.length !== 0) {
			// check if any process has arrived
			let arrivedProcesses = processArrived(current_time);
			// add it to the ready queue and sort by priority
			readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
		}

		// if there are processes in the ready queue
		if (readyQueue.length !== 0) {
			// track the current process's execution time
			let currentExecutionTime = 0;
			// get the first process from the ready queue
			// and remove it from the queue
			let currentProcess = readyQueue.shift();
			// add the start time of the process to the preEmptData
			currentProcess[1].preEmptData.startTime.push(current_time);
			// add the process to the final array
			processedData.push(currentProcess);
			// log the process status as started
			logProcessStatus(currentProcess[0], current_time, "started");

			// This the execution loop of the process
			while (currentProcess[1].operationalBurstTime >= 0 && --FAILSAFE > 0) {
				// check if any process has arrived,
				// add it to the ready queue, and sort by priority
				if (operationalArray.length !== 0) {
					let arrivedProcesses = processArrived(current_time);
					readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
				}

				// if the process has completed
				if (currentProcess[1].operationalBurstTime == 0) {
					// add the end time and execution time to the preEmptData
					currentProcess[1].preEmptData.endTime.push(current_time);
					// also add the execution time
					currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
					// log the process status as completed
					logProcessStatus(currentProcess[0], current_time, "completed");
					break;
					// if the current process has not yet completed, check if any process is ready
				} else if (readyQueue.length !== 0) {
					// Based on priority setting (reverse or not),
					// Check if the if the first process in ready queue has higher priority
					// than the current process
					if (
						(!isReverse && readyQueue[0][1].priority < currentProcess[1].priority) ||
						(isReverse && readyQueue[0][1].priority > currentProcess[1].priority)
					) {
						// If so, preempt the current process
						// add the end time and execution time to the preEmptData
						currentProcess[1].preEmptData.endTime.push(current_time);
						currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
						// add the current process back to the ready queue (at the end)
						readyQueue.push(currentProcess);
						// log the process status as preempted and reason for preemption
						logProcessStatus(
							currentProcess[0],
							current_time,
							"preempted",
							currentExecutionTime,
							`Higher priority Process ${readyQueue[0][0]} arrived`
						);
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
						// Preempt process, add the end time and execution time to the preEmptData
						currentProcess[1].preEmptData.endTime.push(current_time);
						currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
						// add the current process back to the ready queue (after the processes with same priority)
						// filter returns an array of items that match the condition
						// So we filter, process with same priority, then add the current process, then add the rest
						readyQueue = [
							...readyQueue.filter((process) => process[1].priority == currentProcess[1].priority),
							currentProcess,
							...readyQueue.filter((process) => process[1].priority != currentProcess[1].priority),
						];
						// log the process status as preempted and reason for preemption
						logProcessStatus(
							currentProcess[0],
							current_time,
							"preempted",
							currentExecutionTime,
							"Quantum time up"
						);
						break;
					}
				}
				// If the process meets none of the above conditions,
				// it is still running, so increment the current execution time
				currentExecutionTime++;
				// decrement the operational burst time
				currentProcess[1].operationalBurstTime--;
				// increment the current time (Machine time)
				current_time++;
				// log the process status as running
				logProcessStatus(currentProcess[0], current_time, "running", currentExecutionTime);
			}
		} else {
			// if there are no processes in the ready queue
			if (operationalArray.length == 0) {
				// log the process status as all processes completed
				logProcessStatus("CPU", current_time, "allCompleted");
				break;
			}
			// if there are processes yet to arrive
			// and none in ready queue
			// log the process status as idle
			logProcessStatus("CPU", current_time, "idle");
			// increment the current time (Machine time)
			current_time++;
		}
	}
	// let the processData function calculate the turnaround time, waiting time, etc
	processData();
}
