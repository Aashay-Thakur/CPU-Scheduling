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

export default function rr(processes, options) {
	var sortable = [];
	for (let process in processes) {
		sortable.push([
			process,
			{
				...processes[process],
				operationalBurstTime: processes[process].burstTime,
				preEmptData: { startTime: [], endTime: [] },
			},
		]);
	}
	const quantum = options.quantum;
	var processedData = [];
	var readyQueue = [];
	var current_time = 0;
	var operationalArray = sortable;

	function processArrived(time) {
		let returnArray = operationalArray.filter((process) => process[1].arrivalTime === time);
		operationalArray = operationalArray.filter((process) => process[1].arrivalTime !== time);
		returnArray.sort((a, b) => a[0] - b[0]);
		returnArray.map((process) => logProcessStatus(process[0], time, "arrived"));
		if (operationalArray.length === 0) logProcessStatus("CPU", time, "allArrived");
		return returnArray;
	}

	var FAILSAFE = 1000;
	document.querySelector(".log").innerHTML = "";
	while (true && --FAILSAFE > 0) {
		if (operationalArray.length !== 0) {
			let arrivedPorcesses = processArrived(current_time);
			if (arrivedPorcesses.length !== 0) {
				readyQueue.push(...arrivedPorcesses);
			}
		}
		if (readyQueue.length !== 0) {
			let currentProcess = readyQueue.shift();
			let quantumTime = quantum;
			currentProcess[1].preEmptData.startTime.push(current_time);
			logProcessStatus(currentProcess[0], current_time, "started");
			while (currentProcess[1].operationalBurstTime >= 0 && quantumTime >= 0 && --FAILSAFE > 0) {
				if (operationalArray.length !== 0) {
					let arrivedPorcesses = processArrived(current_time);
					arrivedPorcesses.length !== 0 && readyQueue.push(...arrivedPorcesses);
				}
				if (currentProcess[1].operationalBurstTime == 0) {
					currentProcess[1].preEmptData.endTime.push(current_time);
					processedData.push(currentProcess);
					logProcessStatus(currentProcess[0], current_time, "completed");
					break;
				} else if (quantumTime == 0) {
					if (readyQueue.length == 0) {
						quantumTime = quantum;
						continue;
					}
					currentProcess[1].preEmptData.endTime.push(current_time);
					processedData.push(currentProcess);
					readyQueue.push(currentProcess);
					logProcessStatus(currentProcess[0], current_time, "preempted");
					break;
				} else {
					currentProcess[1].operationalBurstTime--;
					quantumTime--;
					current_time++;
					logProcessStatus(currentProcess[0], current_time, "running");
				}
			}
		} else {
			if (operationalArray.length == 0) break;
			logProcessStatus("CPU", current_time, "idle");
			current_time++;
		}
	}
	return processData(processedData);
}
