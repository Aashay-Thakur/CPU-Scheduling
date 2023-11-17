export default function dSSTF(data) {
	let orderedData = [data[0]];
	data.shift();

	let current_time = 0;
	let FAILSAFE = 1000;

	function getArrived(time) {
		return data.filter((item) => item[1].arrival <= time);
	}

	while (true && FAILSAFE-- > 0) {
		let lastRequest = orderedData[orderedData.length - 1];
		let arrived = getArrived(current_time);

		if (arrived.length === 0) {
			current_time++;
			continue;
		}

		let closest = arrived.reduce((acc, item) => {
			if (
				Math.abs(item[1].location - lastRequest[1].location) <
				Math.abs(acc[1].location - lastRequest[1].location)
			) {
				return item;
			}
			return acc;
		});

		orderedData.push(closest);
		data.splice(data.indexOf(closest), 1);
		orderedData[orderedData.length - 1][1].seek = Math.abs(closest[1].location - lastRequest[1].location);
		current_time += orderedData[orderedData.length - 1][1].seek;

		if (data.length === 0) break;
	}

	orderedData.forEach((item, index) => {
		if (!item[1].initial) {
			item[1].seek = Math.abs(orderedData[index - 1][1].location - item[1].location);
		}
	});

	let totalTime = orderedData.reduce((acc, item) => {
		if (!item[1].initial) {
			return acc + item[1].seek;
		}
		return acc;
	}, 0);

	return { processedData: orderedData, totalTime };
}
