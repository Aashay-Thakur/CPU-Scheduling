export default function priority(data, options = { reverse: false }) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}

	let sorted = [];
	let currentTime = 0;
	let MAX_INT = Number.MAX_VALUE;
	while (true || currentTime == MAX_INT) {
		if (sortable.some((process) => process[1].arrivalTime <= currentTime)) {
			let processes = sortable.filter((process) => process[1].arrivalTime <= currentTime);
			processes.sort((a, b) => {
				return options.reverse ? b[1].priority - a[1].priority : a[1].priority - b[1].priority;
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

	sortable.forEach((process, index) => {
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
