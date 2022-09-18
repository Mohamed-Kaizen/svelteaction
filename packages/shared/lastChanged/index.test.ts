import { get } from "svelte/store"
import { lastChanged } from "."

describe("lastChanged", () => {
	it("should be defined", () => {
		expect(lastChanged).toBeDefined()
	})

	it("should work", async () => {
		const { value: lastChangedStore, ms } = lastChanged("hello")

		expect(get(lastChangedStore)).toEqual("hello")

		const past = +Date.now()

		lastChangedStore.set("Hello World")

		expect(get(lastChangedStore)).toEqual("Hello World")

		const sleep = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms))

		await sleep(0.00000001)

		expect(get(ms) < +Date.now()).toBeTruthy()

		expect(get(ms)).toBeGreaterThanOrEqual(past)
	})
})
