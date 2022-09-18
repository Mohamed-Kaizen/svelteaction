import { toString } from "."

describe("toString", () => {
	it("should be defined", () => {
		expect(toString).toBeDefined()
	})

	it("default", () => {
		const value = 123.345

		const str = toString(value)

		expect(str).toBe("123.345")
	})
})
