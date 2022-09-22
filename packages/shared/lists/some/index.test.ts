import { some } from "."

describe("some", () => {
	it("should be defined", () => {
		expect(some).toBeDefined()
	})

	it("should work", () => {
		const result = some([1, 2, 3, 4], (value) => value > 2)

		expect(result).toEqual(true)
	})

	it("should work with different type", () => {
		const result = some([0, 1, 2, 3], (value) => value === 2)

		expect(result).toEqual(true)
	})

	it("should work with empty array", () => {
		const result = some([], (value) => value)

		expect(result).toEqual(false)
	})

	it("should work with empty initial value", () => {
		const result = some([1, 2, 3, 4], (value) => value > 4)

		expect(result).toEqual(false)
	})
})
