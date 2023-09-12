export default function fcfs(data) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}
	sortable.sort(function (a, b) {
		return a[1].arrivalTime - b[1].arrivalTime;
	});
	var chartData = [];
	var processedData = [];
	sortable.forEach((process, index) => {
		if (index === 0) {
			process[1].startTime = process[1].arrivalTime;
			process[1].endTime = process[1].burstTime;
		} else {
			process[1].startTime =
				process[1].arrivalTime <= sortable[index - 1][1].endTime
					? sortable[index - 1][1].endTime
					: process[1].arrivalTime;
			process[1].endTime = process[1].startTime + process[1].burstTime;
		}
		process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
		process[1].waitingTime =
			process[1].turnAroundTime - process[1].burstTime;
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
	document.getElementById("myChart").remove();
	document.getElementById("chartContainer").innerHTML =
		'<canvas id="myChart"></canvas>';
	document.querySelector(".sub_table").innerHTML =
		"<h5>FCFS Scheduling Table</h5>";
	document.querySelector(".sub_chart").innerHTML =
		"<h5>FCFS Scheduling - Gantt Chart</h5>";

	return { chartData, processedData };
}
