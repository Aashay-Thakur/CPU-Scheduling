import fcfs from "../fcfs";

test("fcfs should return the correct processed data", () => {
	const data = {
		P1: {
			arrivalTime: 1,
			burstTime: 11,
		},
		P2: {
			arrivalTime: 5,
			burstTime: 28,
		},
		P3: {
			arrivalTime: 12,
			burstTime: 2,
		},
		P4: {
			arrivalTime: 2,
			burstTime: 10,
		},
		P5: {
			arrivalTime: 9,
			burstTime: 16,
		},
	};

	const expectedProcessedData = [
		[
			"P1",
			{
				arrivalTime: 1,
				burstTime: 11,
				startTime: 1,
				endTime: 12,
				turnAroundTime: 11,
				waitingTime: 0,
				order: 1,
				pid: 1,
			},
		],
		[
			"P4",
			{
				arrivalTime: 2,
				burstTime: 10,
				startTime: 12,
				endTime: 22,
				turnAroundTime: 20,
				waitingTime: 10,
				order: 2,
				pid: 4,
			},
		],
		[
			"P2",
			{
				arrivalTime: 5,
				burstTime: 28,
				startTime: 22,
				endTime: 50,
				turnAroundTime: 45,
				waitingTime: 17,
				order: 3,
				pid: 2,
			},
		],
		[
			"P5",
			{
				arrivalTime: 9,
				burstTime: 16,
				startTime: 50,
				endTime: 66,
				turnAroundTime: 57,
				waitingTime: 41,
				order: 4,
				pid: 5,
			},
		],
		[
			"P3",
			{
				arrivalTime: 12,
				burstTime: 2,
				startTime: 66,
				endTime: 68,
				turnAroundTime: 56,
				waitingTime: 54,
				order: 5,
				pid: 3,
			},
		],
	];

	const processedData = fcfs(data);

	expect(processedData).toEqual(expectedProcessedData);
});
