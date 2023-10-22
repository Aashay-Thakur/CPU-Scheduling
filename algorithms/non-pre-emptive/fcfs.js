export default function fcfs(data) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}
	//* Sort process by arrival time
	sortable.sort((a, b) => a[1].arrivalTime - b[1].arrivalTime);
	//* This is the data for the chart
	var chartData = [];
	//* Data for table
	var processedData = [];

	//* Loop through each process
	sortable.forEach((process, index) => {
		//* Calculate start time and end time
		if (index === 0) {
			//* The start time and end time of the first process is calculated differently
			process[1].startTime = process[1].arrivalTime; //! The start time of the first process is the arrival time
			process[1].endTime = process[1].burstTime + process[1].arrivalTime; //! The end time of the first process is the arrival time + burst time
		} else {
			//! The start time of current process = arrival time of current + end time of previous
			process[1].startTime =
				process[1].arrivalTime <= sortable[index - 1][1].endTime
					? sortable[index - 1][1].endTime
					: process[1].arrivalTime;
			//! The end time of current process = start time of current + burst time of current
			process[1].endTime = process[1].startTime + process[1].burstTime;
		}
		//* Calculate turn around time and waiting time
		process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime; //! Turn around time = end time - arrival time
		process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime; //! Waiting time = turn around time - burst time

		//* Add order and pid to process
		process[1].order = index + 1; //! Order is the index of the process + 1, Since the array is already sorted, the index is the order
		process[1].pid = Number(process[0].slice(1)); //! Pid is the number after the letter in the process name

		//* Push process to processedData
		processedData.push(process); //! Adding the process to the processedData array
		//* Push process to chartData
		//! Chart data is an array of objects, each object represents a process, this is read by chart js to display the chart
		//? Chart Js is a library used to create and display charts
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

	//* Sorting the data by pid (0 to 1) to display the table in order
	processedData.sort((a, b) => a[1].pid - b[1].pid);

	return { chartData, processedData, type: "FCFS" };
}
