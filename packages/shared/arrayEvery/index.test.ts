import { arrayEvery } from "."

describe("arrayEvery", () => {
	it("should be defined", () => {
		expect(arrayEvery).toBeDefined()
	})

	it("should work", () => {
		const result = arrayEvery([1, 2, 3], (value) => value > 0)
		expect(result).toEqual(true)
	})
})
