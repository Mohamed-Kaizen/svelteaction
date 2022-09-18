import { floor } from "."

describe("floor", () => {
	test("should be defined", () => {
		expect(floor).toBeDefined()
	})

	test("should work", () => {
		const original = 1.234
		const result = floor(original)

		expect(result).toBe(1)
	})
})
