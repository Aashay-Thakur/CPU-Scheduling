import priorityPE from "../priority-pe";

describe("priorityPE", () => {
	it("should return the processed data with correct order and properties", () => {
		const processes = {
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
		const options = { reverse: false, quantum: 2 };

		const expectedProcessedData = [
			[
				"P1",
				{
					arrivalTime: 1,
					burstTime: 11,
					priority: 2,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [1, 40],
						endTime: [2, 50],
						executionTime: [1, 10],
					},
					startTime: 1,
					endTime: 50,
					turnAroundTime: 49,
					waitingTime: 38,
					pid: "1",
					order: 1,
					responseTime: 0,
				},
			],
			[
				"P4",
				{
					arrivalTime: 2,
					burstTime: 10,
					priority: 1,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [2, 33],
						endTime: [5, 40],
						executionTime: [3, 7],
					},
					startTime: 2,
					endTime: 40,
					turnAroundTime: 38,
					waitingTime: 28,
					pid: "4",
					order: 2,
					responseTime: 0,
				},
			],
			[
				"P2",
				{
					arrivalTime: 5,
					burstTime: 28,
					priority: 0,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [5],
						endTime: [33],
						executionTime: [28],
					},
					startTime: 5,
					endTime: 33,
					turnAroundTime: 28,
					waitingTime: 0,
					pid: "2",
					order: 3,
					responseTime: 0,
				},
			],
			[
				"P4",
				{
					arrivalTime: 2,
					burstTime: 10,
					priority: 1,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [2, 33],
						endTime: [5, 40],
						executionTime: [3, 7],
					},
					startTime: 2,
					endTime: 40,
					turnAroundTime: 38,
					waitingTime: 28,
					pid: "4",
					order: 2,
					responseTime: 0,
				},
			],
			[
				"P1",
				{
					arrivalTime: 1,
					burstTime: 11,
					priority: 2,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [1, 40],
						endTime: [2, 50],
						executionTime: [1, 10],
					},
					startTime: 1,
					endTime: 50,
					turnAroundTime: 49,
					waitingTime: 38,
					pid: "1",
					order: 1,
					responseTime: 0,
				},
			],
			[
				"P3",
				{
					arrivalTime: 12,
					burstTime: 2,
					priority: 3,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [50],
						endTime: [52],
						executionTime: [2],
					},
					startTime: 50,
					endTime: 52,
					turnAroundTime: 40,
					waitingTime: 38,
					pid: "3",
					order: 4,
					responseTime: 38,
				},
			],
			[
				"P5",
				{
					arrivalTime: 9,
					burstTime: 16,
					priority: 4,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [52],
						endTime: [68],
						executionTime: [16],
					},
					startTime: 52,
					endTime: 68,
					turnAroundTime: 59,
					waitingTime: 43,
					pid: "5",
					order: 5,
					responseTime: 43,
				},
			],
		];

		const result = priorityPE(processes, options);

		expect(result).toEqual(expectedProcessedData);
	});

	// Add more test cases here...
});
