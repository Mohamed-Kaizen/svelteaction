import { objectPick } from "."

describe("objectPick", () => {
	it("should be defined", () => {
		expect(objectPick).toBeDefined()
	})

	it("should work", () => {
		const obj = {
			foo: "foo",
			bar: "bar",
			baz: "baz",
		}

		const { foo, bar } = objectPick(obj, ["foo", "bar"])

		expect(foo).toEqual("foo")

		expect(bar).toEqual("bar")

		expect(objectPick({ a: 1, b: 2, c: 3 }, ["a", "b"])).toEqual({
			a: 1,
			b: 2,
		})

		expect(
			objectPick({ a: 1, b: 2, c: undefined }, ["a", "b"], true)
		).toEqual({ a: 1, b: 2 })
	})
})
