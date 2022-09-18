import { math } from "."

describe("math", () => {
	test("should be defined", () => {
		expect(math).toBeDefined()
	})

	it("should accept numbers", () => {
		const v = math("pow", 2, 3)
		expect(v).toBe(8)
	})

	it("sqrt", () => {
		const v = math("sqrt", 4)
		expect(v).toBe(2)
	})
})
