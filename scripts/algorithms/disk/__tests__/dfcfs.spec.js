test("dfcfs should return the correct processedData and totalTime", () => {
	const data = [
		["A", { initial: true, arrival: 0, location: 50 }],
		["B", { initial: false, arrival: 2, location: 100 }],
		["C", { initial: false, arrival: 5, location: 75 }],
		["D", { initial: false, arrival: 8, location: 125 }],
	];

	const expectedProcessedData = [
		["A", { initial: true, arrival: 0, location: 50 }],
		["B", { initial: false, arrival: 2, location: 100, seek: 50 }],
		["C", { initial: false, arrival: 5, location: 75, seek: 25 }],
		["D", { initial: false, arrival: 8, location: 125, seek: 50 }],
	];

	const expectedTotalTime = 125;

	const result = dfcfs(data);

	expect(result.processedData).toEqual(expectedProcessedData);
	expect(result.totalTime).toEqual(expectedTotalTime);
});
