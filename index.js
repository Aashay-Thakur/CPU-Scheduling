import fcfs from "./algorithms/non-pre-emptive/fcfs.js";
import sjf from "./algorithms/non-pre-emptive/sjf.js";
import priority from "./algorithms/non-pre-emptive/priority.js";

import rr from "./algorithms/pre-emptive/rr.js";
import priorityPE from "./algorithms/pre-emptive/priority-pe.js";
import srtf from "./algorithms/pre-emptive/srtf.js";

import createChart from "./createChart.js";
import createTable from "./createTable.js";

import fillData from "./fillData.js";

const submit = document.querySelector(".submit");

document.addEventListener("DOMContentLoaded", function () {
	var selectElems = document.querySelectorAll("select");
	var selectInstances = M.FormSelect.init(selectElems, {});

	let type = document.querySelector("#type").value;

	addProcesses(5, type);

	document.getElementById("numberOfProcesses").addEventListener("change", (e) => {
		if (e.target.value < 5) {
			e.target.value = 5;
			M.toast({ html: "Minimum number of processes is 5" });
			addProcesses(e.target.value, type);
		} else if (e.target.value > 10) {
			e.target.value = 10;
			M.toast({ html: "Maximum number of processes is 10" });
			addProcesses(e.target.value, type);
		} else {
			addProcesses(e.target.value, type);
		}
	});

	document.querySelector(".addProcess").addEventListener("click", () => {
		let numberOfProcessInput = document.getElementById("numberOfProcesses");
		if (numberOfProcessInput.value < 10) {
			numberOfProcessInput.value++;
			numberOfProcessInput.dispatchEvent(new Event("change", { bubbles: true }));
		} else {
			M.toast({ html: "Maximum number of processes is 10" });
		}
	});

	document.getElementById("options-container").addEventListener("click", (e) => {
		if (e.target && e.target.matches("input#pre-emption")) {
			if (document.querySelector(".quantumInputContainer"))
				document.querySelector(".quantumInputContainer").classList.toggle("hide");
			document.querySelector(".log").innerHTML = "";
			submit.dispatchEvent(new Event("click", { bubbles: true }));
		}
		if (e.target && e.target.matches("input#reverse-switch")) {
			submit.dispatchEvent(new Event("click", { bubbles: true }));
		}
	});
});

function addProcesses(totalNumberOfProcesses, type) {
	document.querySelector(".table-body").innerHTML = "";
	for (let i = 1; i <= totalNumberOfProcesses; i++) {
		let row = `<tr id="p${i}" class="process">
					<td>P${i}</td>
					<td>
						<input
							type="number"
							data-name="arrivalTime"
							name="p${i}arrival"
							class="arrivalInput"
							id="p${i}arrival"
							min="0"
							max="100"
						/>
					</td>
					<td>
						<input
							type="number"
							data-name="burstTime"
							name="p${i}burst"
							id="p${i}burst"
							class="burstInput"
							min="0"
							max="100"
						/>
					</td>
				</tr>`;
		document.querySelector(".table-body").innerHTML += row;
	}
	updateFormTable(type);
	fillData(type);
}

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
	document.querySelectorAll(".toBeRemoved").forEach((elem) => {
		elem.remove();
	});
	document.querySelector(".log").innerHTML = "";

	var preEmptionCheck = `<div class="toBeRemoved">
								<form action="#">
									<p>
										<label>
											<input type="checkbox" id="pre-emption" />
											<span>Pre-emption</span>
										</label>
									</p>
								</form>
							</div>`;

	var quantumInput = `<div class="input-field col s12 l12 m12 toBeRemoved quantumInputContainer hide" data->
							<input type="number" value="10" id="quantum" name="quantum" min="1" />
							<label for="quantum">Quantum</label>
						</div>
						`;

	var optionsContainer = document.querySelector("#options-container");
	switch (type) {
		case "Priority":
			var processRows = document.querySelectorAll(".process");

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

			optionsContainer.innerHTML += preEmptionCheck;
			optionsContainer.innerHTML += quantumInput
				.replace("hide", "tooltipped hide")
				.replace(
					"data-",
					'data-position="right" data-tooltip="Round Robin will be used for processes with the same priority"'
				);
			M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});

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
			optionsContainer.innerHTML = quantumInput.replace("hide", "");

			break;
		case "SJF":
			optionsContainer.innerHTML = preEmptionCheck;
		default:
			break;
	}
}

//* Process form data on submit
submit.addEventListener("click", () => {
	let type = document.querySelector("#type").value;

	if (type === "RR" || type === "Priority") {
		if (document.querySelector("#quantum").value === "" || document.querySelector("#quantum").value === "0") {
			document.querySelector("#quantum").value = 10;
			M.toast({ html: "Quantum cannot be 0<br/>Setting to default value of 10" });
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
		createChart(chartData, "First Come, First Served (FCFS)");
		createTable(processedData, type);
	}
	if (type === "SJF") {
		if (document.getElementById("pre-emption").checked) {
			srtf(processes);
		} else {
			const { chartData, processedData, type } = sjf(processes);
			createChart(chartData, type);
			createTable(processedData, type);
		}
	}
	if (type === "Priority") {
		let options = {
			reverse: document.getElementById("reverse-switch").checked,
			quantum: Number(document.querySelector("#quantum").value),
		};

		if (document.getElementById("pre-emption").checked) {
			priorityPE(processes, options);
			return;
		}

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
