import logProcessStatus from "./log.js";

export default function priorityPE(processes, options) {
	const isReverse = options.reverse;

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

	var processedData = [];
	var chartData = [];
	var readyQueue = [];
	var current_time = 0;
	var operationalArray = sortable;
	var FAILSAFE = 200;

	function processArrived(time) {
		let returnArray = [];
		operationalArray.map((process, i) => {
			if (process[1].arrivalTime == time) {
				console.log(process[0], time, "arrived");
				returnArray.push(process);
				operationalArray.splice(i, 1);
			}
		});
		returnArray.sort((a, b) => a[1].arrivalTime - b[1].arrivalTime);
		console.log(returnArray);
		return returnArray;
	}

	function sortByPriority(array) {
		array.sort((a, b) => {
			// return !isReverse ? a[1].priority - b[1].priority : b[1].priority - a[1].priority;
			return a[1].priority - b[1].priority;
		});
		return array;
	}

	while (true && --FAILSAFE > 0) {
		if (operationalArray.length !== 0) {
			let arrivedProcesses = processArrived(current_time);
			readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
			console.log(arrivedProcesses, readyQueue);
		}

		if (readyQueue.length !== 0) {
			let currentProcess = readyQueue.shift();
			currentProcess[1].preEmptData.startTime.push(current_time);
			processedData.push(currentProcess);

			while (currentProcess[1].operationalBurstTime >= 0 && --FAILSAFE > 0) {
				if (operationalArray.length !== 0) {
					let arrivedProcesses = processArrived(current_time);
					readyQueue = sortByPriority([...readyQueue, ...arrivedProcesses]);
				}

				if (currentProcess[1].operationalBurstTime == 0) {
					currentProcess[1].preEmptData.endTime.push(current_time);
					break;
				} else if (readyQueue.length !== 0) {
					if (readyQueue[0][1].priority < currentProcess[1].priority) {
						currentProcess[1].preEmptData.endTime.push(current_time);
						readyQueue.push(currentProcess);
						break;
					}
					// if (isReverse && readyQueue[0][1].priority < currentProcess[1].priority) {
					// 	currentProcess[1].preEmptData.endTime.push(current_time);
					// 	readyQueue.push(currentProcess);
					// 	break;
					// } else if (!isReverse && readyQueue[0][1].priority > currentProcess[1].priority) {
					// 	currentProcess[1].preEmptData.endTime.push(current_time);
					// 	readyQueue.push(currentProcess);
					// 	break;
					// }
				} else {
					currentProcess[1].operationalBurstTime--;
					current_time++;
				}
			}
		} else {
			if (operationalArray.length == 0) break;
			current_time++;
		}
	}
	// console.log(processedData);
}
