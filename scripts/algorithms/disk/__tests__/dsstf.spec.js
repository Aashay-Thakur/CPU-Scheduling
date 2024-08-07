import dsstf from "../dsstf";

describe("dsstf", () => {
	it("should return the processed data and total time", () => {
		const data = [
			[
				0,
				{
					initial: true,
					location: 50,
					arrival: 0,
					seek: 0,
				},
			],
			[
				1,
				{
					arrival: 0,
					location: 11,
				},
			],
			[
				2,
				{
					arrival: 0,
					location: 28,
				},
			],
			[
				3,
				{
					arrival: 0,
					location: 2,
				},
			],
			[
				4,
				{
					arrival: 0,
					location: 10,
				},
			],
			[
				5,
				{
					arrival: 0,
					location: 16,
				},
			],
			[
				6,
				{
					arrival: 0,
					location: 3,
				},
			],
			[
				7,
				{
					arrival: 0,
					location: 189,
				},
			],
			[
				8,
				{
					arrival: 0,
					location: 50,
				},
			],
			[
				9,
				{
					arrival: 0,
					location: 43,
				},
			],
			[
				10,
				{
					arrival: 0,
					location: 32,
				},
			],
		];

		const expectedProcessedData = [
			[
				0,
				{
					initial: true,
					location: 50,
					arrival: 0,
					seek: 0,
				},
			],
			[
				8,
				{
					arrival: 0,
					location: 50,
					seek: 0,
				},
			],
			[
				9,
				{
					arrival: 0,
					location: 43,
					seek: 7,
				},
			],
			[
				10,
				{
					arrival: 0,
					location: 32,
					seek: 11,
				},
			],
			[
				2,
				{
					arrival: 0,
					location: 28,
					seek: 4,
				},
			],
			[
				5,
				{
					arrival: 0,
					location: 16,
					seek: 12,
				},
			],
			[
				1,
				{
					arrival: 0,
					location: 11,
					seek: 5,
				},
			],
			[
				4,
				{
					arrival: 0,
					location: 10,
					seek: 1,
				},
			],
			[
				6,
				{
					arrival: 0,
					location: 3,
					seek: 7,
				},
			],
			[
				3,
				{
					arrival: 0,
					location: 2,
					seek: 1,
				},
			],
			[
				7,
				{
					arrival: 0,
					location: 189,
					seek: 187,
				},
			],
		];

		const expectedTotalTime = 235;

		const result = dsstf(data);

		expect(result.processedData).toEqual(expectedProcessedData);
		expect(result.totalTime).toEqual(expectedTotalTime);
	});
});
