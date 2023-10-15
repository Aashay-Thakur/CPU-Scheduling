import fcfs from "./algorithms/non-pre-emptive/fcfs.js";
import sjf from "./algorithms/non-pre-emptive/sjf.js";
import priority from "./algorithms/non-pre-emptive/priority.js";

import rr from "./algorithms/pre-emptive/rr.js";

import createChart from "./createChart.js";
import createTable from "./createTable.js";

import fillData from "./fillData.js";

const submit = document.querySelector(".submit");

document.addEventListener("DOMContentLoaded", function () {
	var selectElems = document.querySelectorAll("select");
	var selectInstances = M.FormSelect.init(selectElems, {});

	let type = document.querySelector("#type").value;
	updateFormTable(type);
	fillData(type);
});

document.querySelector(".reset").addEventListener("click", () => {
	document.querySelectorAll("input").forEach((elem) => {
		if (elem.type === "number") elem.value = 0;
		if (elem.getAttribute("id") === "quantum") elem.value = 10;
	});
});

document.querySelector(".randomize").addEventListener("click", () => {
	fillData(document.querySelector("#type").value, true);
});

document.querySelector("#type").addEventListener("change", (e) => {
	let type = e.target.value;
	updateFormTable(type);
	fillData(type);
	submit.dispatchEvent(new Event("click", { bubbles: true }));
});

//* Updates the form table based on the type of algorithm selected
function updateFormTable(type) {
	console.log("updated");
	document.querySelectorAll(".toBeRemoved").forEach((elem) => {
		elem.remove();
	});
	switch (type) {
		case "Priority":
			var processRows = document.querySelectorAll(".process");

			var optionsContainer = document.querySelector("#options-container");
			optionsContainer.innerHTML = `
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
		case "RR":
			var optionsContainer = document.querySelector("#options-container");
			optionsContainer.innerHTML = `
					<div class="input-field col s12 l12 m12 toBeRemoved">
						<input type="number" value="10" id="quantum" name="quantum" min="1" />
						<label for="quantum">Quantum</label>
					</div>
			`;
			break;
		default:
			break;
	}
}

//* Process form data on submit
submit.addEventListener("click", () => {
	let type = document.querySelector("#type").value;

	if (type === "RR") {
		if (document.querySelector("#quantum").value === "" || document.querySelector("#quantum").value === "0") {
			document.querySelector("#quantum").value = 10;
		}
	}
	//* Fetch data from form, and structure it to pass on to the appropriate algorithm
	var dataElems = document.querySelectorAll(".process");
	var processes = {};
	dataElems.forEach((elem) => {
		var data = elem.children;
		let temp = {};
		Array.from(data).forEach((elem, index) => {
			if (index !== 0) {
				temp[elem.children[0].dataset.name] = Number(elem.children[0].value);
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
		let options = {
			reverse: document.getElementById("reverse-switch").checked,
		};

		const { chartData, processedData, type } = priority(processes, options);
		createChart(chartData, type);
		createTable(processedData, type);
	}
	if (type == "RR") {
		let option = { quantum: Number(document.querySelector("#quantum").value) };
		rr(processes, option);
		//TODO: Let RR Handle createChart and createTable function calls, or redirect them here
	}
});
