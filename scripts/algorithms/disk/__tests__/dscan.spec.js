import dscan from "../dscan";

test("dscan should return the correct processedData and totalTime", () => {
	const data = [
		[
			[0, { initial: true, location: 50, arrival: 0, seek: 0 }],
			[1, { arrival: 0, location: 11 }],
			[2, { arrival: 0, location: 28 }],
			[3, { arrival: 0, location: 2 }],
			[4, { arrival: 0, location: 10 }],
			[5, { arrival: 0, location: 16 }],
			[6, { arrival: 0, location: 3 }],
			[7, { arrival: 0, location: 189 }],
			[8, { arrival: 0, location: 50 }],
			[9, { arrival: 0, location: 43 }],
			[10, { arrival: 0, location: 32 }],
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
			7,
			{
				arrival: 0,
				location: 189,
				seek: 139,
			},
		],
		[
			0,
			{
				location: 199,
				seek: 10,
				arrival: 0,
				end: true,
			},
		],
		[
			9,
			{
				arrival: 0,
				location: 43,
				seek: 156,
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
			0,
			{
				location: 0,
				seek: 2,
				arrival: 0,
				end: true,
			},
		],
	];

	const expectedTotalTime = 348;

	const result = dscan(data);

	expect(result.processedData).toEqual(expectedProcessedData);
	expect(result.totalTime).toBe(expectedTotalTime);
});
