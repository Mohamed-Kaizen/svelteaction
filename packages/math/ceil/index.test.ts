import { ceil } from "."

describe("clamp", () => {
	test("should be defined", () => {
		expect(ceil).toBeDefined()
	})

	test("should work", () => {
		const original = 1.234
		const result = ceil(original)

		expect(result).toBe(2)
	})
})
