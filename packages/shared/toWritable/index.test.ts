import { get, readable, writable } from "svelte/store"

import { toWritable } from "."
import { isWritable } from "../utils"

describe("toWritable", () => {
	it("should be defined", () => {
		expect(toWritable).toBeDefined()
	})

	it("default", () => {
		const v = "123.345"

		const w = toWritable(v)

		expect(isWritable(w)).toBeTruthy()
	})

	it("writable", () => {
		const wv = writable("123.345")

		const w = toWritable(wv)

		expect(isWritable(w)).toBeTruthy()
	})

	it("readable", () => {
		const r = readable("123.345")

		const w = toWritable(r)

		expect(isWritable(w)).toBeTruthy()
	})

	it("value", () => {
		const v = "123.345"

		const w = toWritable(v)

		expect(get(w)).toBe("123.345")
	})
})
