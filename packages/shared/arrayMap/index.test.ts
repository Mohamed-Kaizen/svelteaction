import { arrayMap } from "."

describe("arrayMap", () => {
	it("should be defined", () => {
		expect(arrayMap).toBeDefined()
	})

	it("should work", () => {
		const result = arrayMap([1, 2, 3, 4], (value) => value * 2)

		expect(result).toEqual([2, 4, 6, 8])
	})

	it("should work with different type", () => {
		const result = arrayMap([0, 1, 2, 3], (value) => value.toString())

		expect(result).toEqual(["0", "1", "2", "3"])
	})

	it("should work with empty array", () => {
		const result = arrayMap([], (value) => value)

		expect(result).toEqual([])
	})
})
