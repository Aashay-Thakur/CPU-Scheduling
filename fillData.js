export default function fillData(type, randomize = false) {
	let arrivalData = [];
	let burstData = [];
	let priorityData = [];

	arrivalData = [0, 5, 12, 2, 9];
	// arrivalData.fill(0);
	burstData = [11, 28, 2, 10, 16];
	priorityData = [2, 0, 3, 1, 4];

	if (randomize) {
		arrivalData = arrivalData.map(() => Math.floor(Math.random() * 20));
		burstData = arrivalData.map(() => Math.floor(Math.random() * 20));
		priorityData = new Array(5).fill(Math.floor(Math.random() * 10));
	}

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
