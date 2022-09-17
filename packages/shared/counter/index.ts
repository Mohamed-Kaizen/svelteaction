import { get, writable } from "svelte/store"

import { toReadable } from "../toReadable"

export interface CounterOptions {
	min?: number
	max?: number
}

/**
 * Basic counter with utility functions.
 *
 * @param [initialValue=0]
 * @param {Object} options
 */
export function counter(initialValue = 0, options: CounterOptions = {}) {
	const count = writable(initialValue)

	const { max = Infinity, min = -Infinity } = options

	const inc = (delta = 1) => count.set(Math.min(max, get(count) + delta))
	const dec = (delta = 1) => count.set(Math.max(min, get(count) - delta))
	const set = (val: number) => count.set(val)
	const reset = (val = initialValue) => {
		initialValue = val
		return set(val)
	}

	return { count: toReadable(count), inc, dec, set, reset }
}
