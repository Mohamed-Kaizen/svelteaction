import { writable } from "svelte/store"

import { timeoutFn } from "."
import { sleep } from "../sleep"

describe("timeoutFn", () => {
	it("should be defined", () => {
		expect(timeoutFn).toBeDefined()
	})

	it("should work", async () => {
		const callback = vitest.fn()

		const interval = writable(0)

		const { start } = timeoutFn(callback, interval)

		start()

		await sleep(1)

		expect(callback).toBeCalled()

		callback.mockReset()

		interval.set(50)

		start()

		await sleep(1)

		expect(callback).not.toBeCalled()

		await sleep(100)

		expect(callback).toBeCalled()
	})
})
