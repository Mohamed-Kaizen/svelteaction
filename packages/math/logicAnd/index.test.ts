import { and } from "."

describe("and", () => {
	test("should be defined", () => {
		expect(and).toBeDefined()
	})

	it("returns true only when all arguments are truthy", () => {
		expect(and(true, true)).toBe(true)

		expect(and("foo", true)).toBe(true)

		expect(and("foo", 1)).toBe(true)

		expect(and(true, false)).toBe(false)

		expect(and("foo", 0)).toBe(false)
	})
})
