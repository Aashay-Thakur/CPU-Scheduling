test("fcfs should return the correct processed data", () => {
	const data = {
		P1: { arrivalTime: 0, burstTime: 5 },
		P2: { arrivalTime: 2, burstTime: 3 },
		P3: { arrivalTime: 4, burstTime: 2 },
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
			"P2",
			{
				arrivalTime: 2,
				burstTime: 3,
				startTime: 5,
				endTime: 8,
				turnAroundTime: 6,
				waitingTime: 3,
				order: 2,
				pid: 2,
			},
		],
		[
			"P3",
			{
				arrivalTime: 4,
				burstTime: 2,
				startTime: 8,
				endTime: 10,
				turnAroundTime: 6,
				waitingTime: 4,
				order: 3,
				pid: 3,
			},
		],
	];

	const processedData = fcfs(data);

	expect(processedData).toEqual(expectedProcessedData);
});
