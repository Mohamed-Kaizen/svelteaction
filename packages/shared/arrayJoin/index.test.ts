import { arrayJoin } from "."

describe("arrayJoin", () => {
	it("should be defined", () => {
		expect(arrayJoin).toBeDefined()
	})

	it("should work", () => {
		expect(arrayJoin(["a", "b", "c"], ", ")).toEqual("a, b, c")

		expect(arrayJoin(["a", "b", "c"], " ")).toEqual("a b c")

		expect(arrayJoin(["a", "b", "c"], "-")).toEqual("a-b-c")

		expect(arrayJoin(["a", "b", "c"], "")).toEqual("abc")
	})

	it("should work with empty array", () => {
		expect(arrayJoin([], ", ")).toEqual("")
	})

	it("should work with empty separator", () => {
		expect(arrayJoin(["a", "b", "c"], "")).toEqual("abc")
	})

	it("should work with undefined separator", () => {
		expect(arrayJoin(["a", "b", "c"], undefined)).toEqual("a,b,c")
	})

	it("should work with different type", () => {
		const list = ["a", 1, true, null, undefined, { a: 1 }, [1, 2, 3]]
		expect(arrayJoin(list, ", ")).toEqual(
			"a, 1, true, , , [object Object], 1,2,3"
		)
	})
})
