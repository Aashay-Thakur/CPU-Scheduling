export default function dfcfs(data) {
	let processedData = [];

	processedData = data.sort((a, b) => {
		if (a[1].initial) return -1;
		return a[1].arrival - b[1].arrival;
	});

	processedData.forEach((item, index) => {
		if (!item[1].initial) {
			item[1].seek = Math.abs(processedData[index - 1][1].location - item[1].location);
		}
	});

	return processedData;
}
