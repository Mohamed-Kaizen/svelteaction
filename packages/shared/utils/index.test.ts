import { increaseWithUnit, objectPick } from "."

describe("utils", () => {
	it("increaseWithUnit", () => {
		expect(increaseWithUnit(100, 1)).toEqual(101)
		expect(increaseWithUnit("1px", 1)).toEqual("2px")
		expect(increaseWithUnit("-1em", 1)).toEqual("0em")
		expect(increaseWithUnit("1em", -1)).toEqual("0em")
		expect(increaseWithUnit("1em", -5)).toEqual("-4em")
		expect(increaseWithUnit("0.5vw", 1.5)).toEqual("2vw")
		expect(increaseWithUnit("100 %", 10)).toEqual("110 %")
		expect(increaseWithUnit("var(--cool)", -5)).toEqual("var(--cool)")
	})

	it("objectPick", () => {
		expect(objectPick({ a: 1, b: 2, c: 3 }, ["a", "b"])).toEqual({
			a: 1,
			b: 2,
		})
		expect(
			objectPick({ a: 1, b: 2, c: undefined }, ["a", "b"], true)
		).toEqual({ a: 1, b: 2 })
	})
})
