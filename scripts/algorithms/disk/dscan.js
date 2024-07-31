export default function dscan(data) {
	let orderedData = [data[0]];
	data.shift();

	let currentLocation = orderedData[0][1].location;
	let direction = 1; // 1 for moving towards higher locations, -1 for moving towards lower locations
	let FAILSAFE = 1000;

	while (true && FAILSAFE-- > 0) {
		let requests = data.filter((item) => {
			if (direction === 1) {
				return (
					item[1].location >= currentLocation &&
					item[1].arrival <= orderedData[orderedData.length - 1][1].arrival
				);
			} else {
				return (
					item[1].location <= currentLocation &&
					item[1].arrival <= orderedData[orderedData.length - 1][1].arrival
				);
			}
		});

		if (requests.length === 0) {
			orderedData.push([
				0,
				{ location: direction === 1 ? 199 : 0, seek: 199 - currentLocation, arrival: 0, end: true },
			]);
			currentLocation = orderedData[orderedData.length - 1][1].location;
			// Change direction and continue
			direction = -direction;
			continue;
		}

		requests.sort((a, b) => {
			return direction === 1 ? a[1].location - b[1].location : b[1].location - a[1].location;
		});

		let nextRequest = requests[0];
		orderedData.push(nextRequest);
		data.splice(data.indexOf(nextRequest), 1);
		orderedData[orderedData.length - 1][1].seek = Math.abs(nextRequest[1].location - currentLocation);
		currentLocation = nextRequest[1].location;

		if (data.length === 0) {
			orderedData.push([
				0,
				{
					location: direction === 1 ? 199 : 0,
					seek: currentLocation,
					arrival: 0,
					end: true,
				},
			]);
			break;
		}
	}

	let totalTime = orderedData.reduce((acc, item) => acc + item[1].seek, 0);

	return { processedData: orderedData, totalTime };
}
