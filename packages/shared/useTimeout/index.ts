import { readable } from "svelte/store"

import { useTimeoutFn } from "../useTimeoutFn"
import { noop } from "../utils"

import type { Readable } from "svelte/store"

import type { UseTimeoutFnOptions } from "../useTimeoutFn"
import type { Stoppable } from "../utils"

export interface UseTimeoutOptions<Controls extends boolean>
	extends UseTimeoutFnOptions {
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
export function useTimeout(
	interval?: number,
	options?: UseTimeoutOptions<false>
): Readable<boolean>
export function useTimeout(
	interval: number,
	options: UseTimeoutOptions<true>
): {
	ready: Readable<boolean>
} & Stoppable
export function useTimeout(
	interval = 1000,
	options: UseTimeoutOptions<boolean> = {}
) {
	const { controls: exposeControls = false } = options

	const controls = useTimeoutFn(noop, interval, options)

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
