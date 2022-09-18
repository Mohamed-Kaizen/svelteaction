import { containsKey } from "."

describe("containsKey", () => {
	it("should be defined", () => {
		expect(containsKey).toBeDefined()
	})

	it("should work", () => {
		const result = containsKey({ a: 1, b: 2, c: 3 }, "a")

		expect(result).toEqual(true)
	})

	it("should work with empty object", () => {
		const result = containsKey({}, "a")

		expect(result).toEqual(false)
	})

	it("should work with empty initial value", () => {
		const result = containsKey({ a: 1, b: 2, c: 3 }, "")

		expect(result).toEqual(false)
	})

	it("should work with empty object and empty initial value", () => {
		const result = containsKey({}, "")

		expect(result).toEqual(false)
	})
})
