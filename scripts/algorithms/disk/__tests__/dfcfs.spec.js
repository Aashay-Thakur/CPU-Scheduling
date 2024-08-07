import dfcfs from "../dfcfs";

test("dfcfs should return the correct processedData and totalTime", () => {
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
			1,
			{
				arrival: 0,
				location: 11,
				seek: 39,
			},
		],
		[
			2,
			{
				arrival: 0,
				location: 28,
				seek: 17,
			},
		],
		[
			3,
			{
				arrival: 0,
				location: 2,
				seek: 26,
			},
		],
		[
			4,
			{
				arrival: 0,
				location: 10,
				seek: 8,
			},
		],
		[
			5,
			{
				arrival: 0,
				location: 16,
				seek: 6,
			},
		],
		[
			6,
			{
				arrival: 0,
				location: 3,
				seek: 13,
			},
		],
		[
			7,
			{
				arrival: 0,
				location: 189,
				seek: 186,
			},
		],
		[
			8,
			{
				arrival: 0,
				location: 50,
				seek: 139,
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
	];

	const expectedTotalTime = 452;

	const result = dfcfs(data);

	expect(result.processedData).toEqual(expectedProcessedData);
	expect(result.totalTime).toEqual(expectedTotalTime);
});
