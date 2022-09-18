import { sortObject } from "."

describe("sortObject", () => {
	it("should be defined", () => {
		expect(sortObject).toBeDefined()
	})

	it("should work", () => {
		const obj = {
			foo: "foo",
			bar: "bar",
			baz: "baz",
		}

		expect(sortObject(obj)).toEqual({
			bar: "bar",
			baz: "baz",
			foo: "foo",
		})
	})
})
