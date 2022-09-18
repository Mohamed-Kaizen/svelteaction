import { arrayFilter } from "."

describe("arrayFilter", () => {
	it("should be defined", () => {
		expect(arrayFilter).toBeDefined()
	})

	it("should work", () => {
		const result = arrayFilter(
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			(value) => value % 2 === 0
		)
		expect(result).toEqual([0, 2, 4, 6, 8])
	})

	it("will return empty result", () => {
		const result = arrayFilter([1, 2, 3], (value) => value > 3)
		expect(result).toEqual([])
	})
})
