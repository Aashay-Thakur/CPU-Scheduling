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

	function processArrived(time) {
		let returnArray = operationalArray.filter((process) => process[1].arrivalTime === time);
		operationalArray = operationalArray.filter((process) => process[1].arrivalTime !== time);
		returnArray.sort((a, b) => a[0] - b[0]);
		returnArray.map((process) => logProcessStatus(process[0], time, "arrived"));
		if (operationalArray.length == 0) logProcessStatus("CPU", time, "allArrived");
		return returnArray;
	}

	function sortByPriority(array) {
		return array.sort((a, b) => {
			return !isReverse ? a[1].priority - b[1].priority : b[1].priority - a[1].priority;
			// return a[1].priority - b[1].priority;
		});
	}

	function processData() {
		[...new Set(processedData)].map((process, index) => {
			process[1].startTime = process[1].preEmptData.startTime[0];
			process[1].endTime = process[1].preEmptData.endTime[process[1].preEmptData.endTime.length - 1];
			process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
			process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime;
			process[1].pid = process[0][1];
			process[1].order = index + 1;
			process[1].responseTime = process[1].startTime - process[1].arrivalTime;

			// let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
			let colors = ["#36a2eb", "#ff6384", "#ff9f40", "#4bc0c0", "#9966ff", "#ffcd56"];

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
			logProcessStatus(currentProcess[0], current_time, "started");

			while (currentProcess[1].operationalBurstTime >= 0 && --FAILSAFE > 0) {
				if (operationalArray.length !== 0) {
					let arrivedProcesses = processArrived(current_time);
					readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
				}

				if (currentProcess[1].operationalBurstTime == 0) {
					currentProcess[1].preEmptData.endTime.push(current_time);
					currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
					logProcessStatus(currentProcess[0], current_time, "completed");
					break;
				} else if (readyQueue.length !== 0) {
					if (
						(!isReverse && readyQueue[0][1].priority < currentProcess[1].priority) ||
						(isReverse && readyQueue[0][1].priority > currentProcess[1].priority)
					) {
						currentProcess[1].preEmptData.endTime.push(current_time);
						currentProcess[1].preEmptData.executionTime.push(currentExecutionTime);
						readyQueue.push(currentProcess);
						logProcessStatus(
							currentProcess[0],
							current_time,
							"preempted",
							currentExecutionTime,
							`Higher priority Process ${readyQueue[0][0]} arrived`
						);
						break;
					}
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
				currentExecutionTime++;
				currentProcess[1].operationalBurstTime--;
				current_time++;
				logProcessStatus(currentProcess[0], current_time, "running", currentExecutionTime);
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
	processData();
}
