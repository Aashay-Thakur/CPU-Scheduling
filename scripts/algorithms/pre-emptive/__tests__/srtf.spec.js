import srtf from "../algorithms/pre-emptive/srtf.js";

describe("srtf", () => {
	it("should return an empty array if no processes are provided", () => {
		const result = srtf({});
		expect(result).toEqual([]);
	});

	it("should correctly calculate the turnaround time and waiting time for each process", () => {
		const processes = {
			P1: { arrivalTime: 0, burstTime: 5 },
			P2: { arrivalTime: 1, burstTime: 3 },
			P3: { arrivalTime: 2, burstTime: 4 },
		};
		const result = srtf(processes);
		expect(result).toEqual([
			[
				"P1",
				{
					arrivalTime: 0,
					burstTime: 5,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [0],
						endTime: [5],
						executionTime: [5],
					},
					startTime: 0,
					endTime: 5,
					turnAroundTime: 5,
					waitingTime: 0,
					pid: "1",
					order: 1,
					responseTime: 0,
				},
			],
			[
				"P2",
				{
					arrivalTime: 1,
					burstTime: 3,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [1],
						endTime: [4],
						executionTime: [3],
					},
					startTime: 1,
					endTime: 4,
					turnAroundTime: 3,
					waitingTime: 0,
					pid: "2",
					order: 2,
					responseTime: 0,
				},
			],
			[
				"P3",
				{
					arrivalTime: 2,
					burstTime: 4,
					operationalBurstTime: 0,
					preEmptData: {
						startTime: [2],
						endTime: [8],
						executionTime: [6],
					},
					startTime: 2,
					endTime: 8,
					turnAroundTime: 6,
					waitingTime: 2,
					pid: "3",
					order: 3,
					responseTime: 0,
				},
			],
		]);
	});

	// Add more test cases here...
});
