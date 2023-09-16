import fcfs from "./algorithms/non-pre-emptive/fcfs.js";
import sjf from "./algorithms/non-pre-emptive/sjf.js";
import priority from "./algorithms/non-pre-emptive/priority.js";

import createChart from "./createChart.js";
import createTable from "./createTable.js";

import fillData from "./fillData.js";

document.addEventListener("DOMContentLoaded", function () {
	var selectElems = document.querySelectorAll("select");
	var selectInstances = M.FormSelect.init(selectElems, {});

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

//* Updates the form table based on the type of algorithm selected
function updateFormTable(type) {
	switch (type) {
		case "Priority":
			var processRows = document.querySelectorAll(".process");

			var switchContainer = document.querySelector("#switch-container");
			switchContainer.innerHTML = `
			<div class="toBeRemoved">
				Reverse Priority
				<div class="switch">
					<label>
						0 = Highest Priority
						<input type="checkbox" id="reverse-switch">
						<span class="lever"></span>
						N = Highest Priority
					</label>
				</div>
			</div>`;

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

//* Process form data on submit
submit.addEventListener("click", () => {
	let type = document.querySelector("#type").value;

	//* Fetch data from form, and structure it to pass on to the appropriate algorithm
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

	if (type === "FCFS") {
		const { chartData, processedData, type } = fcfs(processes);
		createChart(chartData, type);
		createTable(processedData, type);
	}
	if (type === "SJF") {
		const { chartData, processedData, type } = sjf(processes);
		createChart(chartData, type);
		createTable(processedData, type);
	}
	if (type === "Priority") {
		var options = {
			reverse: document.getElementById("reverse-switch").checked,
		};

		const { chartData, processedData, type } = priority(processes, options);
		createChart(chartData, type);
		createTable(processedData, type);
	}
});
