import fcfs from "./algorithms/non-pre-emptive/fcfs.js";
import sjf from "./algorithms/non-pre-emptive/sjf.js";
import priority from "./algorithms/non-pre-emptive/priority.js";

import createChart from "./createChart.js";
import createTable from "./createTable.js";

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elems, {});

	updateFormTable(document.querySelector("#type").value);
});

const submit = document.querySelector(".btn");

document.querySelector("#type").addEventListener("change", (e) => {
	updateFormTable(e.target.value);
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

			var defaultPriority = [5, 3, 2, 2, 1];
			processRows.forEach((elem, index) => {
				let priorityTableData = document.createElement("td");
				let priorityInput = document.createElement("input");
				priorityInput.setAttribute("type", "number");
				priorityInput.setAttribute("min", "0");
				priorityInput.setAttribute("id", `p${index + 1}priority`);
				priorityInput.setAttribute("name", `p${index + 1}priority`);
				priorityInput.setAttribute("value", defaultPriority[index]);
				priorityInput.dataset.name = "priority";

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
		priority(processes);
		// const { chartData, processedData, type } = priority(processes);
		// createChart(chartData, type);
		// createTable(processedData, type);
	}
});
