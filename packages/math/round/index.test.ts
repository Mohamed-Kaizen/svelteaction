import { round } from "."

describe("round", () => {
	test("should be defined", () => {
		expect(round).toBeDefined()
	})

	it("should work", () => {
		expect(round(45.125)).toBe(45)
	})
})
