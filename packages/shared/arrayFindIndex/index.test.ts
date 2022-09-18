import { arrayFindIndex } from "."

describe("arrayFindIndex", () => {
	it("should be defined", () => {
		expect(arrayFindIndex).toBeDefined()
	})

	it("should work", () => {
		const result = arrayFindIndex([1, 2, 3, 4], (value) => value === 3)
		expect(result).toBe(2)
	})

	it("should return -1", () => {
		const result = arrayFindIndex([1, 2, 3, 4], (value) => value === 5)
		expect(result).toBe(-1)
	})
})
