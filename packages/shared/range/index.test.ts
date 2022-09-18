import { range } from "."

describe("range", () => {
	it("should be defined", () => {
		expect(range).toBeDefined()
	})

	it("should work", () => {
		expect(range(5)).toEqual([0, 1, 2, 3, 4])

		expect(range(5, 10)).toEqual([5, 6, 7, 8, 9])

		expect(range(5, 10, 2)).toEqual([5, 7, 9])

		expect(range(10, 5, -1)).toEqual([10, 9, 8, 7, 6])

		expect(range(10, 5, -2)).toEqual([10, 8, 6])

		expect(range(10, 5, -3)).toEqual([10, 7])

		expect(range(10, 5, -4)).toEqual([10, 6])

		expect(range(10, 5, -5)).toEqual([10])

		expect(range(10, 5, -6)).toEqual([10])

		expect(range(5, 10, -1)).toEqual([])

		expect(range(5, 10, -2)).toEqual([])

		expect(range(5, 10, -3)).toEqual([])

		expect(range(5, 10, -4)).toEqual([])

		expect(range(5, 10, -5)).toEqual([])

		expect(range(5, 10, -6)).toEqual([])
	})
})
