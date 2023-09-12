import fcfs from "./algorithms/non-pre-emptive/fcfs.js";
import sjf from "./algorithms/non-pre-emptive/sjf.js";
import createChart from "./createChart.js";
import createTable from "./createTable.js";

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elems, {});
});

const submit = document.querySelector(".btn");

submit.addEventListener("click", () => {
	var dataElems = document.querySelectorAll(".process");
	var processes = {};
	dataElems.forEach((elem) => {
		var data = elem.children;
		processes[data[0].innerText] = {
			arrivalTime: Number(data[1].firstElementChild.value),
			burstTime: Number(data[2].firstElementChild.value),
		};
	});
	if (document.querySelector("#type").value === "FCFS") {
		const { chartData, processedData } = fcfs(processes);
		createChart(chartData);
		createTable(processedData);
	}
	if (document.querySelector("#type").value === "SJF") {
		const { chartData, processedData } = sjf(processes);
		createChart(chartData);
		createTable(processedData);
	}
});
