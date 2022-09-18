import { arraySome } from "."

describe("arraySome", () => {
	it("should be defined", () => {
		expect(arraySome).toBeDefined()
	})

	it("should work", () => {
		const result = arraySome([1, 2, 3, 4], (value) => value > 2)

		expect(result).toEqual(true)
	})

	it("should work with different type", () => {
		const result = arraySome([0, 1, 2, 3], (value) => value === 2)

		expect(result).toEqual(true)
	})

	it("should work with empty array", () => {
		const result = arraySome([], (value) => value)

		expect(result).toEqual(false)
	})

	it("should work with empty initial value", () => {
		const result = arraySome([1, 2, 3, 4], (value) => value > 4)

		expect(result).toEqual(false)
	})
})
