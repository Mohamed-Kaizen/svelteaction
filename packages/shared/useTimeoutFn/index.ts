import { writable, get } from "svelte/store"

import { tryOnDestroy } from "../tryOnDestroy"
import { isClient, isReadable, toReadable } from "../utils"

import type { Stoppable, MaybeStore } from "../utils"

export interface UseTimeoutFnOptions {
	/**
	 * Start the timer immediate after calling this function
	 *
	 * @default true
	 */
	immediate?: boolean
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeoutFn(
	cb: (...args: unknown[]) => any,
	interval: MaybeStore<number>,
	options: UseTimeoutFnOptions = {}
): Stoppable {
	const { immediate = true } = options

	const isPending = writable(false)

	let timer: number | null = null

	function clear() {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
	}

	function stop() {
		isPending.set(false)
		clear()
	}

	function start(...args: unknown[]) {
		clear()
		isPending.set(true)
		timer = setTimeout(
			() => {
				isPending.set(false)
				timer = null
				cb(...args)
			},
			isReadable(interval) ? get(interval) : interval
		) as unknown as number
	}

	if (immediate) {
		isPending.set(true)
		if (isClient) {
			start()
		}
	}

	tryOnDestroy(stop)

	return {
		isPending: toReadable(isPending),
		start,
		stop,
	}
}
