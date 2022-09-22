import { join } from "."

describe("join", () => {
	it("should be defined", () => {
		expect(join).toBeDefined()
	})

	it("should work", () => {
		expect(join(["a", "b", "c"], ", ")).toEqual("a, b, c")

		expect(join(["a", "b", "c"], " ")).toEqual("a b c")

		expect(join(["a", "b", "c"], "-")).toEqual("a-b-c")

		expect(join(["a", "b", "c"], "")).toEqual("abc")
	})

	it("should work with empty array", () => {
		expect(join([], ", ")).toEqual("")
	})

	it("should work with empty separator", () => {
		expect(join(["a", "b", "c"], "")).toEqual("abc")
	})

	it("should work with undefined separator", () => {
		expect(join(["a", "b", "c"], undefined)).toEqual("a,b,c")
	})

	it("should work with different type", () => {
		const list = ["a", 1, true, null, undefined, { a: 1 }, [1, 2, 3]]
		expect(join(list, ", ")).toEqual(
			"a, 1, true, , , [object Object], 1,2,3"
		)
	})
})
