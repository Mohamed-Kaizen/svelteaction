import { arrayFind } from "."

describe("arrayFind", () => {
	it("should be defined", () => {
		expect(arrayFind).toBeDefined()
	})

	it("should work", () => {
		const result = arrayFind([1, 2, 3, 4], (value) => value === 3)
		expect(result).toBe(3)
	})

	it("should return undefined", () => {
		const result = arrayFind([1, 2, 3, 4], (value) => value === 5)
		expect(result).toBe(undefined)
	})
})
