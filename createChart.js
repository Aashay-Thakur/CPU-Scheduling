export default function createChart(data, type) {
	console.log(data);
	document.getElementById("chartContainer").innerHTML = "";
	document.getElementById("chartContainer").innerHTML = "<canvas id='myChart'></canvas>";
	const ctx = document.getElementById("myChart");

	const myChart = new Chart(ctx, {
		type: "line",
		data: {
			datasets: data,
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			datasets: {
				line: {
					borderWidth: 20,
					pointRadius: 0,
				},
			},
			scales: {
				y: {
					suggestedMin: 0,
					display: false,
				},
				xAxis: {
					type: "linear",
					ticks: {
						beginAtZero: true,
						stepSize: 1,
					},
				},
			},
			plugins: {
				legend: {
					position: "top",
					labels: {
						generateLabels: function (chart) {
							var data = chart.data;
							return data.datasets.map((dataset) => {
								return {
									text: dataset.label,
									fillStyle: dataset.backgroundColor,
									strokeStyle: dataset.legendOutline,
									lineWidth: 1,
								};
							});
						},
					},
				},
			},
		},
	});

	document.querySelector(".sub_chart").innerHTML = `<h5>${type} Scheduling - Gantt Chart</h5>`;
}
