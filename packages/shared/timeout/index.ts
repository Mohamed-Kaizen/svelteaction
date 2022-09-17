import { readable } from "svelte/store"

import { timeoutFn } from "../timeoutFn"
import { noop } from "../utils"

import type { Readable } from "svelte/store"

import type { TimeoutFnOptions } from "../timeoutFn"
import type { Stoppable } from "../utils"

export interface TimeoutOptions<Controls extends boolean>
	extends TimeoutFnOptions {
	/**
	 * Expose more controls
	 *
	 * @default false
	 */
	controls?: Controls
}

/**
 * Update value after a given time with controls.
 *
 * @param interval
 * @param options
 */
export function timeout(
	interval?: number,
	options?: TimeoutOptions<false>
): Readable<boolean>
export function timeout(
	interval: number,
	options: TimeoutOptions<true>
): {
	ready: Readable<boolean>
} & Stoppable
export function timeout(
	interval = 1000,
	options: TimeoutOptions<boolean> = {}
) {
	const { controls: exposeControls = false } = options

	const controls = timeoutFn(noop, interval, options)

	const ready = readable(true, (set) => {
		controls.isPending.subscribe((value) => set(!value))
	})

	if (exposeControls) {
		return {
			ready,
			...controls,
		}
	} else {
		return ready
	}
}
