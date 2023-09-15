export default function fillData(type) {
	let arrivalData = [0, 5, 12, 2, 9];
	let burstData = [11, 28, 2, 10, 16];
	let priorityData = [2, 0, 3, 1, 4];

	var arrivalInputs = document.querySelectorAll(".arrivalInput");
	var burstInputs = document.querySelectorAll(".burstInput");

	arrivalInputs.forEach((elem, index) => {
		elem.value = arrivalData[index];
	});

	burstInputs.forEach((elem, index) => {
		elem.value = burstData[index];
	});

	if (type === "Priority") {
		var priorityInputs = document.querySelectorAll(".priorityInput");
		priorityInputs.forEach((elem, index) => {
			elem.value = priorityData[index];
		});
	}
}
