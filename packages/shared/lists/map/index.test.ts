import { map } from "."

describe("map", () => {
	it("should be defined", () => {
		expect(map).toBeDefined()
	})

	it("should work", () => {
		const result = map([1, 2, 3, 4], (value) => value * 2)

		expect(result).toEqual([2, 4, 6, 8])
	})

	it("should work with different type", () => {
		const result = map([0, 1, 2, 3], (value) => value.toString())

		expect(result).toEqual(["0", "1", "2", "3"])
	})

	it("should work with empty array", () => {
		const result = map([], (value) => value)

		expect(result).toEqual([])
	})
})
