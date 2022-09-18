import { or } from "."

describe("or", () => {
	test("should be defined", () => {
		expect(or).toBeDefined()
	})

	it("returns true when any argument is truthy", () => {
		expect(or(true, true)).toBe(true)

		expect(or("foo", true)).toBe(true)

		expect(or("foo", 1)).toBe(true)

		expect(or(true, false)).toBe(true)

		expect(or("foo", 0)).toBe(true)

		expect(or(0, 0)).toBe(false)
	})
})
