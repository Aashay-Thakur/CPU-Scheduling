test("dscan should return the correct processedData and totalTime", () => {
	const data = [
		[1, { location: 50, arrival: 0 }],
		[2, { location: 100, arrival: 1 }],
		[3, { location: 75, arrival: 2 }],
		[4, { location: 125, arrival: 3 }],
	];

	const expectedProcessedData = [
		[1, { location: 50, arrival: 0, seek: 0 }],
		[2, { location: 75, arrival: 2, seek: 25 }],
		[3, { location: 100, arrival: 1, seek: 25 }],
		[4, { location: 125, arrival: 3, seek: 25 }],
		[0, { location: 199, seek: 74, arrival: 0, end: true }],
	];

	const expectedTotalTime = 74;

	const result = dscan(data);

	expect(result.processedData).toEqual(expectedProcessedData);
	expect(result.totalTime).toBe(expectedTotalTime);
});
