import dsstf from "./algorithms/disk/dsstf";

describe("dsstf", () => {
	it("should return the processed data and total time", () => {
		const data = [
			[["A", { arrival: 0, location: 50 }]],
			[["B", { arrival: 2, location: 100 }]],
			[["C", { arrival: 4, location: 75 }]],
			[["D", { arrival: 6, location: 125 }]],
		];

		const expectedProcessedData = [
			[["A", { arrival: 0, location: 50, seek: 0 }]],
			[["B", { arrival: 2, location: 100, seek: 50 }]],
			[["C", { arrival: 4, location: 75, seek: 25 }]],
			[["D", { arrival: 6, location: 125, seek: 50 }]],
		];

		const expectedTotalTime = 125;

		const result = dsstf(data);

		expect(result.processedData).toEqual(expectedProcessedData);
		expect(result.totalTime).toEqual(expectedTotalTime);
	});
});
