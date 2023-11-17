export default function dfcfs(data) {
	let orderedData = [];

	orderedData = data.sort((a, b) => {
		if (a[1].initial) return -1;
		return a[1].arrival - b[1].arrival;
	});

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
