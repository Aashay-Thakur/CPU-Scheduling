export default function fcfs(data) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}
	sortable.sort((a, b) => a[1].arrivalTime - b[1].arrivalTime);
	var processedData = [];

	sortable.forEach((process, index) => {
		if (index === 0) {
			process[1].startTime = process[1].arrivalTime;
			process[1].endTime = process[1].burstTime + process[1].arrivalTime;
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
