import dfcfs from "./algorithms/disk/dfcfs.js";
import dsstf from "./algorithms/disk/dsstf.js";
import dscan from "./algorithms/disk/dscan.js";

import { fillDiskData } from "./fillData.js";
import Chart from "./Chart.js";
import { createTableDisk } from "./createTable.js";
import M from "materialize-css";

const submitDisk = document.querySelector(".submitDisk");
const calculateDisk = () =>
	submitDisk.dispatchEvent(new Event("click", { bubbles: true }));

const setTitle = title => {
	document.querySelector(
		".diskChartTitle",
	).innerHTML = `<h5>Disk Scheduling - ${title} Scheduling - Scatter Chart</h5>`;
	document.querySelector(
		".diskTableTitle",
	).innerHTML = `<h5>Disk Scheduling - ${title} Scheduling - Table</h5>`;
};

document.addEventListener("DOMContentLoaded", () => {
	var totalNumberOfIO = document.getElementById("numberOfIO").value;

	document
		.getElementById("numberOfIO")
		.addEventListener("change", function (e) {
			if (e.target.value < 10) {
				e.target.value = 10;
				M.toast({ html: "Minimum number of I/O is 10" });
			} else if (e.target.value > 20) {
				e.target.value = 20;
				M.toast({ html: "Maximum number of I/O is 20" });
			}

			totalNumberOfIO = e.target.value;
			updateTable(totalNumberOfIO);
		});

	updateTable(totalNumberOfIO);

	submitDisk.addEventListener("click", () => {
		var type = document.getElementById("disk-type").value;
		var data = getData();
		calculate(type, data, totalNumberOfIO);
	});
});

function updateTable(totalNumberOfIO) {
	var table = document.getElementById("tableIO");
	table.innerHTML = "";

	var arrivalRow = document.createElement("tr");
	var locationRow = document.createElement("tr");

	let arrivalHeading = document.createElement("th");
	arrivalHeading.innerHTML = "Arrival";
	arrivalRow.appendChild(arrivalHeading);

	let locationHeading = document.createElement("th");
	locationHeading.innerHTML = "Location";
	locationRow.appendChild(locationHeading);

	for (let i = 1; i <= totalNumberOfIO; i++) {
		let cell = `
					<td>
						<div class="input-field">
							<input type="number"
							data-name="ioarrival"
							name="io${i}arrival"
							class="ioarrivalInput"
							id="io${i}arrival"
							min="0"
							max="100" />
							<label class="active" for="io${i}arrival">${i}</label>
						</div>
					</td>
			`;

		arrivalRow.innerHTML += cell;
		locationRow.innerHTML += cell
			.replace(/arrival/g, "location")
			.replace(/<label.+<\/label>/, "");
	}

	table.appendChild(arrivalRow);
	table.appendChild(locationRow);

	fillDiskData(type);
}

function getData() {
	var arrivalInputs = document.querySelectorAll(".ioarrivalInput");
	var locationInputs = document.querySelectorAll(".iolocationInput");
	var initialLocation = parseInt(
		document.getElementById("initialLocation").value,
	);

	let data = [
		[0, { initial: true, location: initialLocation, arrival: 0, seek: 0 }],
	];

	arrivalInputs.forEach((input, index) => {
		data.push([index + 1, { arrival: parseInt(input.value) }]);
	});

	locationInputs.forEach((input, index) => {
		data[index + 1][1].location = parseInt(input.value);
	});

	return data;
}

function calculate(type, data, totalNumberOfIO) {
	let returnData;
	const chart = new Chart();
	let title = "";

	switch (type) {
		case "dFCFS":
			title = "First Come First Serve";
			returnData = dfcfs(data);
			break;
		case "dSSTF":
			title = "Shortest Seek Time First";
			returnData = dsstf(data);
			break;
		case "dSCAN":
			title = "SCAN";
			returnData = dscan(data);
			break;
	}

	let { processedData, totalTime } = returnData;

	document.querySelector(
		".total",
	).innerHTML = `<b>Total Seek Time: ${totalTime}<b/>`;
	setTitle(title);
	chart.lineChart(processedData, processedData.length);
	createTableDisk(processedData);
}
