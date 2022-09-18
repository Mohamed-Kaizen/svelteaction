import { abs } from "."

describe("abs", () => {
	test("should be defined", () => {
		expect(abs).toBeDefined()
	})

	test("should work", () => {
		const original = -1
		const result = abs(original)

		expect(result).toBe(1)
	})
})
