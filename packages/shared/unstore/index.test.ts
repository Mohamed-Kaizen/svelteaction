import { readable, writable } from "svelte/store"

import { unstore } from "."

describe("unstore", () => {
	it("should be defined", () => {
		expect(unstore).toBeDefined()
	})

	it("default", () => {
		const v = "123.345"

		const un = unstore(v)

		expect(un).toBe("123.345")
	})

	it("writable", () => {
		const wv = writable("123.345")

		const un = unstore(wv)

		expect(un).toBe("123.345")
	})

	it("readable", () => {
		const r = readable("123.345")

		const un = unstore(r)

		expect(un).toBe("123.345")
	})
})
