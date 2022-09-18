import { get, readable, writable } from "svelte/store"

import { toReadable } from "."
import { isReadable } from "../utils"

describe("toReadable", () => {
	it("should be defined", () => {
		expect(toReadable).toBeDefined()
	})

	it("default", () => {
		const w = "123.345"

		const r = toReadable(w)

		expect(isReadable(r)).toBeTruthy()
	})

	it("writable", () => {
		const w = writable("123.345")

		const r = toReadable(w)

		expect(isReadable(r)).toBeTruthy()
	})

	it("readable", () => {
		const r = readable("123.345")

		const r2 = toReadable(r)

		expect(isReadable(r2)).toBeTruthy()
	})

	it("value", () => {
		const w = "123.345"

		const r = toReadable(w)

		expect(get(r)).toBe("123.345")
	})
})
