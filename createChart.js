export default function createChart(data) {
	const ctx = document.getElementById("myChart");

	const myChart = new Chart(ctx, {
		type: "line",
		data: {
			datasets: data,
		},
		options: {
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
}
