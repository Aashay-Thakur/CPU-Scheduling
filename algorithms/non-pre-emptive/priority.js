export default function priority(data, options = { reverse: false }) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}
	// Sort process by priority
	sortable
		.sort(function (a, b) {
			return a[1].arrivalTime - b[1].arrivalTime;
		})
		.sort(function (a, b) {
			if (!a[1].arrivalTime - b[1].arrivalTime < 0) {
				return options.reverse ? a[1].priority - b[1].priority : b[1].priority - a[1].priority;
			}
		});

	var chartData = [];
	var processedData = [];

	sortable.forEach((process, index) => {
		if (index === 0) {
			process[1].startTime = process[1].arrivalTime;
			process[1].endTime = process[1].burstTime + process[1].startTime;
		} else {
			process[1].startTime = process[1].arrivalTime <= sortable[index - 1][1].endTime ? sortable[index - 1][1].endTime : process[1].arrivalTime;
			process[1].endTime = process[1].startTime + process[1].burstTime;
		}
		process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
		process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime;

		process[1].order = index + 1;
		process[1].pid = Number(process[0].slice(1));

		chartData.push({
			label: process[0],
			data: [
				{
					x: process[1].startTime,
					y: 0,
				},
				{
					x: process[1].endTime,
					y: 0,
				},
			],
		});

		processedData.sort((a, b) => a[1].pid - b[1].pid);
		processedData.push(process);
	});

	return { chartData, processedData, type: "Priority" };
}
