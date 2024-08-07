import rr from "../rr";

describe("rr", () => {
	it("should return processed data with correct order and times", () => {
		const processes = {
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
		const options = { quantum: 10 };

		const result = rr(processes, options);

		const expectedProcessedData = [
			[
				"P1",
				{
					arrivalTime: 1,
					burstTime: 11,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [1, 41],
						endTime: [11, 42],
					},
					startTime: 1,
					endTime: 42,
					turnAroundTime: 41,
					waitingTime: 30,
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
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [11],
						endTime: [21],
					},
					startTime: 11,
					endTime: 21,
					turnAroundTime: 19,
					waitingTime: 9,
					pid: "4",
					order: 2,
					responseTime: 9,
				},
			],
			[
				"P2",
				{
					arrivalTime: 5,
					burstTime: 28,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [21, 44, 60],
						endTime: [31, 54, 68],
					},
					startTime: 21,
					endTime: 68,
					turnAroundTime: 63,
					waitingTime: 35,
					pid: "2",
					order: 3,
					responseTime: 16,
				},
			],
			[
				"P5",
				{
					arrivalTime: 9,
					burstTime: 16,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [31, 54],
						endTime: [41, 60],
					},
					startTime: 31,
					endTime: 60,
					turnAroundTime: 51,
					waitingTime: 35,
					pid: "5",
					order: 4,
					responseTime: 22,
				},
			],
			[
				"P1",
				{
					arrivalTime: 1,
					burstTime: 11,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [1, 41],
						endTime: [11, 42],
					},
					startTime: 1,
					endTime: 42,
					turnAroundTime: 41,
					waitingTime: 30,
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
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [42],
						endTime: [44],
					},
					startTime: 42,
					endTime: 44,
					turnAroundTime: 32,
					waitingTime: 30,
					pid: "3",
					order: 5,
					responseTime: 30,
				},
			],
			[
				"P2",
				{
					arrivalTime: 5,
					burstTime: 28,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [21, 44, 60],
						endTime: [31, 54, 68],
					},
					startTime: 21,
					endTime: 68,
					turnAroundTime: 63,
					waitingTime: 35,
					pid: "2",
					order: 3,
					responseTime: 16,
				},
			],
			[
				"P5",
				{
					arrivalTime: 9,
					burstTime: 16,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [31, 54],
						endTime: [41, 60],
					},
					startTime: 31,
					endTime: 60,
					turnAroundTime: 51,
					waitingTime: 35,
					pid: "5",
					order: 4,
					responseTime: 22,
				},
			],
			[
				"P2",
				{
					arrivalTime: 5,
					burstTime: 28,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [21, 44, 60],
						endTime: [31, 54, 68],
					},
					startTime: 21,
					endTime: 68,
					turnAroundTime: 63,
					waitingTime: 35,
					pid: "2",
					order: 3,
					responseTime: 16,
				},
			],
		];

		expect(result).toEqual(expectedProcessedData);
	});

	// Add more test cases here...
});
