import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default class Chart {
	colors = [
		"#36a2eb",
		"#ff6384",
		"#ff9f40",
		"#4bc0c0",
		"#9966ff",
		"#ffcd56",
		"#c9cbcf",
		"#b00004",
		"#2d5a6a",
		"#65af50",
	];
	lengthMultiplier = 15;
	lineWidth = "25px";

	get colors() {
		return this.colors;
	}

	get lengthMultiplier() {
		return this.lengthMultiplier;
	}

	get lineWidth() {
		return this.lineWidth;
	}

	getTicks(data) {
		let returnArray = [];
		data.map((elem) => {
			returnArray.push(elem[1]);
			returnArray.push(elem[2]);
		});
		return [...new Set(returnArray)];
	}

	getCoords(data) {
		let set = [...new Set(data)];
		let returnArray = [];
		for (let process in set) {
			if (set[process][1].hasOwnProperty("preEmptData")) {
				set[process][1].preEmptData.startTime.map((time, i) => {
					returnArray.push([set[process][1].pid, time, set[process][1].preEmptData.endTime[i]]);
				});
			} else {
				returnArray.push([set[process][1].pid, set[process][1].startTime, set[process][1].endTime]);
			}
		}
		returnArray.sort((a, b) => a[1] - b[1]);
		return returnArray;
	}

	resetChart() {
		d3.select("#chart").selectAll("svg").remove();
		d3.select("#chart").selectAll("div").remove();
		d3.select("#chart-legends").selectAll("div").remove();
	}

	createLegend(totalNumberOfProcesses) {
		var chartLegendContainer = document.querySelector("#chart-legends");
		for (let i = 0; i < totalNumberOfProcesses; i++) {
			let legend = document.createElement("div");
			legend.classList.add("legend");
			legend.innerHTML = `P${i + 1}`;
			legend.style.backgroundColor = this.colors[i];
			chartLegendContainer.appendChild(legend);
		}
	}

	ganttChart(dataset, totalNumberOfProcesses, title) {
		this.resetChart();

		dataset = this.getCoords(dataset);
		var ticks = this.getTicks(dataset);
		var lengthMultiplier = this.lengthMultiplier;
		var colors = this.colors;
		var lineWidth = this.lineWidth;

		const xScale = d3.scaleLinear();
		xScale.domain([dataset[0][1], dataset[dataset.length - 1][2]]);
		xScale.range([dataset[0][1] * lengthMultiplier, dataset[dataset.length - 1][2] * lengthMultiplier]);

		d3.select("#chart")
			.selectAll("div")
			.remove()
			.data(dataset)
			.enter()
			.append("div")
			.attr("class", "tooltipped chart-bar")
			.attr("data-position", "top")
			.attr("data-tooltip", (d) => {
				M.Tooltip.init(document.querySelectorAll(".tooltipped"));
				return `P${d[0]} ${d[1]}-${d[2]}`;
			})
			.attr("data-pid", (d) => d[0])
			.style("height", lineWidth)
			.style("width", (d) => xScale(d[2] - d[1]) + "px")
			.style("background-color", (d) => {
				return colors[d[0] - 1];
			})
			.style("position", "absolute")
			// .style("top", (d) => d[0] * 40 + "px")
			.style("top", "50%")
			.style("transform", "translateY(-50%)")
			.style("left", (d) => xScale(d[1]) + 10 + "px");

		const xAxis = d3.axisBottom(xScale).tickValues(ticks);

		d3.select("#chart")
			.append("svg")
			.attr("id", "xAxis")
			.style("position", "absolute")
			.style("top", "calc(100% - 30px)")
			.style("left", "10")
			.attr("width", () => {
				return xScale(dataset[dataset.length - 1][2]) + 20;
			})
			.attr("height", "100%")
			.append("g")
			.call(xAxis);

		this.createLegend(totalNumberOfProcesses);
	}
}
