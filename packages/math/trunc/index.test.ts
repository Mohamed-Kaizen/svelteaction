import { trunc } from "."

describe("trunc", () => {
	test("should be defined", () => {
		expect(trunc).toBeDefined()
	})

	it("should work", () => {
		expect(trunc(45.125)).toBe(45)
	})
})
