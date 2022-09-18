import { not } from "."

describe("not", () => {
	test("should be defined", () => {
		expect(not).toBeDefined()
	})

	it("should return true when false", () => {
		expect(not(false)).toBe(true)
	})

	it("should return false when true", () => {
		expect(not(true)).toBe(false)
	})
})
