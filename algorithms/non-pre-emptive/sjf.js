export default function sjf(data) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}

	// Failsafe to prevent infinite loop
	var MAX_INT = Number.MAX_VALUE;
	//* Empty array to store sorted processes
	let sorted = [];
	//* Current time acts like a clock for the algorithm,
	//* to determine which processes have arrived and to sort them
	let currentTime = 0;
	//! Infinite loop, breaks when all processes are sorted
	while (true || currentTime == MAX_INT) {
		//* Check if any processes have arrived at the current time
		if (sortable.some((process) => process[1].arrivalTime <= currentTime)) {
			//* Filter out processes that have arrived
			let processes = sortable.filter((process) => process[1].arrivalTime <= currentTime);
			//* Sort the arrived processes by burst time
			processes.sort((a, b) => {
				return a[1].burstTime - b[1].burstTime;
			});
			//* Push the first process to the sorted array (The shortest job)
			sorted.push(processes[0]);
			//* Remove the process from the sortable array
			sortable = sortable.filter((process) => process[0] !== processes[0][0]);
			//* Increment the current time by the burst time of the process (Time spent in execution of the process just added)
			currentTime += processes[0][1].burstTime;
		} else {
			currentTime++;
		}
		if (sortable.length === 0) break;
	}
	sortable = sorted;

	var chartData = [];
	var processedData = [];
	sortable.map((process, index) => {
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

		processedData.push(process);

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
	});

	processedData.sort(function (a, b) {
		return a[1].pid - b[1].pid;
	});

	return { chartData, processedData, type: "SJF" };
}
