import { describe, expect, test } from "vitest"

import { useShare } from "."

describe("useCore", () => {
	test("work", () => {
		const header = useShare()
		expect(header).toBe("Hello from share")
	})
})
