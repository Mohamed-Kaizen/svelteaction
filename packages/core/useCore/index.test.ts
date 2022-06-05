import { describe, expect, test } from "vitest"

import { useCore } from "."

describe("useCore", () => {
	test("work", () => {
		const header = useCore()
		expect(header).toBe("Hello from core")
	})
})
