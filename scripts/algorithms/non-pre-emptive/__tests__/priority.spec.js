import priority from "../priority";

test("priority scheduling", () => {
	const data = {
		P1: {
			arrivalTime: 1,
			burstTime: 11,
			priority: 2,
		},
		P2: {
			arrivalTime: 5,
			burstTime: 28,
			priority: 0,
		},
		P3: {
			arrivalTime: 12,
			burstTime: 2,
			priority: 3,
		},
		P4: {
			arrivalTime: 2,
			burstTime: 10,
			priority: 1,
		},
		P5: {
			arrivalTime: 9,
			burstTime: 16,
			priority: 4,
		},
	};

	const expected = [
		[
			"P1",
			{
				arrivalTime: 1,
				burstTime: 11,
				priority: 2,
				startTime: 1,
				endTime: 12,
				turnAroundTime: 11,
				waitingTime: 0,
				order: 1,
				pid: 1,
			},
		],
		[
			"P2",
			{
				arrivalTime: 5,
				burstTime: 28,
				priority: 0,
				startTime: 12,
				endTime: 40,
				turnAroundTime: 35,
				waitingTime: 7,
				order: 2,
				pid: 2,
			},
		],
		[
			"P4",
			{
				arrivalTime: 2,
				burstTime: 10,
				priority: 1,
				startTime: 40,
				endTime: 50,
				turnAroundTime: 48,
				waitingTime: 38,
				order: 3,
				pid: 4,
			},
		],
		[
			"P3",
			{
				arrivalTime: 12,
				burstTime: 2,
				priority: 3,
				startTime: 50,
				endTime: 52,
				turnAroundTime: 40,
				waitingTime: 38,
				order: 4,
				pid: 3,
			},
		],
		[
			"P5",
			{
				arrivalTime: 9,
				burstTime: 16,
				priority: 4,
				startTime: 52,
				endTime: 68,
				turnAroundTime: 59,
				waitingTime: 43,
				order: 5,
				pid: 5,
			},
		],
	];

	const result = priority(data);

	expect(result).toEqual(expected);
});
