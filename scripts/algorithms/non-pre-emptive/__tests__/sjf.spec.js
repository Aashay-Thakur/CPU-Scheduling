test("sjf function should return the correct processed data", () => {
	const data = {
		P1: { arrivalTime: 0, burstTime: 5 },
		P2: { arrivalTime: 1, burstTime: 3 },
		P3: { arrivalTime: 2, burstTime: 8 },
		P4: { arrivalTime: 3, burstTime: 2 },
	};

	const expectedProcessedData = [
		[
			"P1",
			{
				arrivalTime: 0,
				burstTime: 5,
				startTime: 0,
				endTime: 5,
				turnAroundTime: 5,
				waitingTime: 0,
				order: 1,
				pid: 1,
			},
		],
		[
			"P4",
			{
				arrivalTime: 3,
				burstTime: 2,
				startTime: 5,
				endTime: 7,
				turnAroundTime: 4,
				waitingTime: 2,
				order: 2,
				pid: 4,
			},
		],
		[
			"P2",
			{
				arrivalTime: 1,
				burstTime: 3,
				startTime: 7,
				endTime: 10,
				turnAroundTime: 9,
				waitingTime: 6,
				order: 3,
				pid: 2,
			},
		],
		[
			"P3",
			{
				arrivalTime: 2,
				burstTime: 8,
				startTime: 10,
				endTime: 18,
				turnAroundTime: 16,
				waitingTime: 8,
				order: 4,
				pid: 3,
			},
		],
	];

	const processedData = sjf(data);

	expect(processedData).toEqual(expectedProcessedData);
});
