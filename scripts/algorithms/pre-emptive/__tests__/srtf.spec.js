import srtf from "../srtf";

describe("srtf", () => {
	it("should return an empty array if no processes are provided", () => {
		const result = srtf({});
		expect(result).toEqual([]);
	});

	it("should correctly calculate the turnaround time and waiting time for each process", () => {
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

		const expectedProcessedData = [
			[
				"P1",
				{
					arrivalTime: 1,
					burstTime: 11,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [1],
						endTime: [12],
						executionTime: [11],
					},
					startTime: 1,
					endTime: 12,
					turnAroundTime: 11,
					waitingTime: 0,
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
						startTime: [12],
						endTime: [14],
						executionTime: [2],
					},
					startTime: 12,
					endTime: 14,
					turnAroundTime: 2,
					waitingTime: 0,
					pid: "3",
					order: 2,
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
						startTime: [14],
						endTime: [24],
						executionTime: [10],
					},
					startTime: 14,
					endTime: 24,
					turnAroundTime: 22,
					waitingTime: 12,
					pid: "4",
					order: 3,
					responseTime: 12,
				},
			],
			[
				"P5",
				{
					arrivalTime: 9,
					burstTime: 16,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [24],
						endTime: [40],
						executionTime: [16],
					},
					startTime: 24,
					endTime: 40,
					turnAroundTime: 31,
					waitingTime: 15,
					pid: "5",
					order: 4,
					responseTime: 15,
				},
			],
			[
				"P2",
				{
					arrivalTime: 5,
					burstTime: 28,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [40],
						endTime: [68],
						executionTime: [28],
					},
					startTime: 40,
					endTime: 68,
					turnAroundTime: 63,
					waitingTime: 35,
					pid: "2",
					order: 5,
					responseTime: 35,
				},
			],
		];

		const result = srtf(processes);

		expect(result).toEqual(expectedProcessedData);
	});

	// Add more test cases here...
});
