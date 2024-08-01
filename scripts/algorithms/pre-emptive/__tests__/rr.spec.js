import rr from "./rr.js";

describe("rr", () => {
	it("should return processed data with correct order and times", () => {
		const processes = {
			P1: { arrivalTime: 0, burstTime: 5 },
			P2: { arrivalTime: 1, burstTime: 3 },
			P3: { arrivalTime: 2, burstTime: 4 },
		};
		const options = { quantum: 2 };

		const result = rr(processes, options);

		expect(result).toEqual([
			[
				"P1",
				{
					arrivalTime: 0,
					burstTime: 5,
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
					startTime: 5,
					endTime: 8,
					turnAroundTime: 7,
					waitingTime: 4,
					pid: "2",
					order: 2,
					responseTime: 4,
				},
			],
			[
				"P3",
				{
					arrivalTime: 2,
					burstTime: 4,
					startTime: 8,
					endTime: 12,
					turnAroundTime: 10,
					waitingTime: 6,
					pid: "3",
					order: 3,
					responseTime: 6,
				},
			],
		]);
	});

	// Add more test cases here...
});
