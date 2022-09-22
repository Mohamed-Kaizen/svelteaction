import { find } from "."

describe("find", () => {
	it("should be defined", () => {
		expect(find).toBeDefined()
	})

	it("should work", () => {
		const result = find([1, 2, 3, 4], (value) => value === 3)
		expect(result).toBe(3)
	})

	it("should return undefined", () => {
		const result = find([1, 2, 3, 4], (value) => value === 5)
		expect(result).toBe(undefined)
	})
})
