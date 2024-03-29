import { writable, get } from "svelte/store"

import { toReadable } from "../toReadable"
import { tryOnDestroy } from "../tryOnDestroy"
import { isClient, isReadable } from "../utils"

import type { Fn, Pauseable, MaybeStore } from "../utils"

export interface IntervalFnOptions {
	/**
	 * Start the timer immediately
	 *
	 * @default true
	 */
	immediate?: boolean

	/**
	 * Execute the callback immediate after calling this function
	 *
	 * @default false
	 */
	immediate_callback?: boolean
}

/**
 * Wrapper for `setInterval` with controls
 *
 * @param cb
 * @param interval
 * @param options
 */
export function intervalFn(
	cb: Fn,
	interval: MaybeStore<number> = 1000,
	options: IntervalFnOptions = {}
): Pauseable {
	const { immediate = true, immediate_callback = false } = options

	const isActive = writable(false)

	let timer: any = null

	function clean() {
		if (timer) {
			clearInterval(timer)
			timer = null
		}
	}

	function pause() {
		isActive.set(false)
		clean()
	}

	function resume() {
		if (interval <= 0) {
			return
		}
		isActive.set(true)
		if (immediate_callback) {
			cb()
		}
		clean()
		timer = setInterval(cb, isReadable(interval) ? get(interval) : interval)
	}

	if (immediate && isClient) {
		resume()
	}

	tryOnDestroy(pause)

	return {
		isActive: toReadable(isActive),
		pause,
		resume,
	}
}

// alias
export { intervalFn as interval_fn }
