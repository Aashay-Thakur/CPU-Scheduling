export default function sjf(data) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}

	var MAX_INT = Number.MAX_VALUE;
	let sorted = [];
	let currentTime = 0;
	while (true || currentTime == MAX_INT) {
		if (sortable.some((process) => process[1].arrivalTime <= currentTime)) {
			let processes = sortable.filter((process) => process[1].arrivalTime <= currentTime);
			processes.sort((a, b) => {
				return a[1].burstTime - b[1].burstTime;
			});
			sorted.push(processes[0]);
			sortable = sortable.filter((process) => process[0] !== processes[0][0]);
			currentTime += processes[0][1].burstTime;
		} else {
			currentTime++;
		}
		if (sortable.length === 0) break;
	}
	sortable = sorted;

	var processedData = [];
	sortable.map((process, index) => {
		if (index === 0) {
			process[1].startTime = process[1].arrivalTime;
			process[1].endTime = process[1].burstTime + process[1].startTime;
		} else {
			process[1].startTime =
				process[1].arrivalTime <= sortable[index - 1][1].endTime
					? sortable[index - 1][1].endTime
					: process[1].arrivalTime;
			process[1].endTime = process[1].startTime + process[1].burstTime;
		}
		process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
		process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime;

		process[1].order = index + 1;
		process[1].pid = Number(process[0].slice(1));

		processedData.push(process);
	});

	return processedData;
}
