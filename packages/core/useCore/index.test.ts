import { useCore } from "."

describe("useCore", () => {
	test("work", () => {
		const header = useCore()
		expect(header).toBe("Hello from core")
	})
})
