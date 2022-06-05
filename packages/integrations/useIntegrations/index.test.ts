import { useIntegrations } from "."

describe("useCore", () => {
	test("work", () => {
		const header = useIntegrations()
		expect(header).toBe("Hello from integrations")
	})
})
