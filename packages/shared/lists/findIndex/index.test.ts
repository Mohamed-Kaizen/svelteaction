import { findIndex } from "."

describe("findIndex", () => {
	it("should be defined", () => {
		expect(findIndex).toBeDefined()
	})

	it("should work", () => {
		const result = findIndex([1, 2, 3, 4], (value) => value === 3)
		expect(result).toBe(2)
	})

	it("should return -1", () => {
		const result = findIndex([1, 2, 3, 4], (value) => value === 5)
		expect(result).toBe(-1)
	})
})
