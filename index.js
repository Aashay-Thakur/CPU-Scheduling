import fcfs from "./algorithms/non-pre-emptive/fcfs.js";
import sjf from "./algorithms/non-pre-emptive/sjf.js";
import priority from "./algorithms/non-pre-emptive/priority.js";

import createChart from "./createChart.js";
import createTable from "./createTable.js";

import fillData from "./fillData.js";

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elems, {});

	let type = document.querySelector("#type").value;
	updateFormTable(type);
	fillData(type);
});

const submit = document.querySelector(".btn");

document.querySelector("#type").addEventListener("change", (e) => {
	let type = e.target.value;
	updateFormTable(type);
	fillData(type);
});

function updateFormTable(type) {
	switch (type) {
		case "Priority":
			var processRows = document.querySelectorAll(".process");

			let tableHead = document.querySelector("#table_head_row");
			let priorityHead = document.createElement("th");
			priorityHead.innerText = "Priority";
			priorityHead.classList.add("toBeRemoved");
			tableHead.appendChild(priorityHead);

			processRows.forEach((elem, index) => {
				let priorityTableData = document.createElement("td");
				let priorityInput = document.createElement("input");
				priorityInput.setAttribute("type", "number");
				priorityInput.setAttribute("min", "0");
				priorityInput.setAttribute("id", `p${index + 1}priority`);
				priorityInput.setAttribute("name", `p${index + 1}priority`);
				priorityInput.dataset.name = "priority";
				priorityInput.classList.add("priorityInput");

				priorityTableData.appendChild(priorityInput);
				priorityTableData.classList.add("toBeRemoved");
				elem.appendChild(priorityTableData);
			});
			break;
		default:
			document.querySelectorAll(".toBeRemoved").forEach((elem) => {
				elem.remove();
			});
			break;
	}
}

submit.addEventListener("click", () => {
	var dataElems = document.querySelectorAll(".process");
	var processes = {};
	dataElems.forEach((elem) => {
		var data = elem.children;
		let temp = {};
		Array.from(data).forEach((elem, index) => {
			if (index !== 0) {
				temp[elem.firstChild.dataset.name] = Number(elem.firstChild.value);
			}
		});
		processes[data[0].innerText] = temp;
	});
	if (document.querySelector("#type").value === "FCFS") {
		const { chartData, processedData, type } = fcfs(processes);
		createChart(chartData, type);
		createTable(processedData, type);
	}
	if (document.querySelector("#type").value === "SJF") {
		const { chartData, processedData, type } = sjf(processes);
		createChart(chartData, type);
		createTable(processedData, type);
	}
	if (document.querySelector("#type").value === "Priority") {
		const { chartData, processedData, type } = priority(processes);
		createChart(chartData, type);
		createTable(processedData, type);

		console.log(processedData);
	}
});
