import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export default function d3Chart(dataset, totalNumberOfProcesses, title) {
	// Reset chart
	d3.select("#chart").selectAll("svg").remove();
	d3.select("#chart").selectAll("div").remove();
	d3.select("#chart-legends").selectAll("div").remove();

	dataset = getCoords(dataset);

	// Chart modifiers
	const lengthMultiplier = 15;
	const lineWidth = "25px";

	var ticks = getTicks(dataset);

	const xScale = d3.scaleLinear();
	xScale.domain([dataset[0][1], dataset[dataset.length - 1][2]]);
	xScale.range([dataset[0][1] * lengthMultiplier, dataset[dataset.length - 1][2] * lengthMultiplier]);

	let colors = [
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

	d3.select("#chart")
		.selectAll("div")
		.remove()
		.data(dataset)
		.enter()
		.append("div")
		.attr("class", "tooltipped")
		.attr("data-position", "top")
		.attr("data-tooltip", (d) => {
			M.Tooltip.init(document.querySelectorAll(".tooltipped"));
			return `P${d[0]}`;
		})
		.attr("data-pid", (d) => d[0])
		.style("height", lineWidth)
		.style("width", (d) => xScale(d[2] - d[1]) + "px")
		.style("background-color", (d) => {
			return colors[d[0] - 1];
		})
		.style("position", "absolute")
		// .style("top", (d) => d[0] * 20 + "px")
		.style("top", "50%")
		.style("transform", "translateY(-50%)")
		.style("left", (d) => xScale(d[1]) + 10 + "px");

	const xAxis = d3.axisBottom(xScale).tickValues(ticks);

	d3.select("#chart")
		.append("svg")
		.attr("width", () => {
			return xScale(dataset[dataset.length - 1][2]) + 20;
		})
		.attr("height", "100%")
		.append("g")
		.attr("transform", "translate(10,100)")
		.call(xAxis);

	var chartLegendContainer = document.querySelector("#chart-legends");
	for (let i = 0; i < totalNumberOfProcesses; i++) {
		let legend = document.createElement("div");
		legend.classList.add("legend");
		legend.innerHTML = `P${i + 1}`;
		legend.style.backgroundColor = colors[i];
		chartLegendContainer.appendChild(legend);
	}

	document.querySelector(".sub_chart").innerHTML = `<h5>${title} Scheduling - Gantt Chart</h5>`;
}

function getTicks(data) {
	let returnArray = [];
	data.map((elem) => {
		returnArray.push(elem[1]);
		returnArray.push(elem[2]);
	});
	return [...new Set(returnArray)];
}

function getCoords(data) {
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
