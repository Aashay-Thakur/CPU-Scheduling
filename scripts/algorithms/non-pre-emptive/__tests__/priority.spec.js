test("priority scheduling", () => {
	const data = {
		P1: { arrivalTime: 0, burstTime: 5, priority: 2 },
		P2: { arrivalTime: 1, burstTime: 3, priority: 1 },
		P3: { arrivalTime: 2, burstTime: 4, priority: 3 },
		P4: { arrivalTime: 3, burstTime: 2, priority: 2 },
	};

	const expected = [
		[
			"P3",
			{
				arrivalTime: 2,
				burstTime: 4,
				priority: 3,
				startTime: 0,
				endTime: 4,
				turnAroundTime: 2,
				waitingTime: 0,
				order: 1,
				pid: 3,
			},
		],
		[
			"P1",
			{
				arrivalTime: 0,
				burstTime: 5,
				priority: 2,
				startTime: 4,
				endTime: 9,
				turnAroundTime: 9,
				waitingTime: 4,
				order: 2,
				pid: 1,
			},
		],
		[
			"P4",
			{
				arrivalTime: 3,
				burstTime: 2,
				priority: 2,
				startTime: 9,
				endTime: 11,
				turnAroundTime: 8,
				waitingTime: 6,
				order: 3,
				pid: 4,
			},
		],
		[
			"P2",
			{
				arrivalTime: 1,
				burstTime: 3,
				priority: 1,
				startTime: 11,
				endTime: 14,
				turnAroundTime: 13,
				waitingTime: 10,
				order: 4,
				pid: 2,
			},
		],
	];

	const result = priority(data);
	expect(result).toEqual(expected);
});
