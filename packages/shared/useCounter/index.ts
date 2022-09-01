import { get, writable } from "svelte/store"

import { toReadable } from "../utils"

export interface UseCounterOptions {
	min?: number
	max?: number
}

/**
 * Basic counter with utility functions.
 *
 * @see https://vueuse.org/useCounter
 * @param [initialValue=0]
 * @param {Object} options
 */
export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
	const count = writable(initialValue)

	const { max = Infinity, min = -Infinity } = options

	const inc = (delta = 1) => count.set(Math.min(max, get(count) + delta))
	const dec = (delta = 1) => count.set(Math.max(min, get(count) - delta))
	const set = (val: number) => count.set(val)
	const reset = (val = initialValue) => {
		initialValue = val
		return set(val)
	}

	return { count: toReadable(count), inc, dec, get, set, reset }
}
