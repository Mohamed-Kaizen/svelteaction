import { every } from "."

describe("every", () => {
	it("should be defined", () => {
		expect(every).toBeDefined()
	})

	it("should work", () => {
		const result = every([1, 2, 3], (value) => value > 0)
		expect(result).toEqual(true)
	})
})
