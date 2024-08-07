import sjf from "../sjf";

test("sjf function should return the correct processed data", () => {
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
			"P3",
			{
				arrivalTime: 12,
				burstTime: 2,
				startTime: 12,
				endTime: 14,
				turnAroundTime: 2,
				waitingTime: 0,
				order: 2,
				pid: 3,
			},
		],
		[
			"P4",
			{
				arrivalTime: 2,
				burstTime: 10,
				startTime: 14,
				endTime: 24,
				turnAroundTime: 22,
				waitingTime: 12,
				order: 3,
				pid: 4,
			},
		],
		[
			"P5",
			{
				arrivalTime: 9,
				burstTime: 16,
				startTime: 24,
				endTime: 40,
				turnAroundTime: 31,
				waitingTime: 15,
				order: 4,
				pid: 5,
			},
		],
		[
			"P2",
			{
				arrivalTime: 5,
				burstTime: 28,
				startTime: 40,
				endTime: 68,
				turnAroundTime: 63,
				waitingTime: 35,
				order: 5,
				pid: 2,
			},
		],
	];

	const processedData = sjf(data);

	expect(processedData).toEqual(expectedProcessedData);
});
