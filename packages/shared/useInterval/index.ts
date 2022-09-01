import { writable } from "svelte/store"

import { useIntervalFn } from "../useIntervalFn"
import { toReadable } from "../utils"

import type { Readable } from "svelte/store"

import type { Pauseable } from "../utils"

export interface UseIntervalOptions<Controls extends boolean> {
	/**
	 * Expose the controls
	 *
	 * @default false
	 */
	controls?: Controls

	/**
	 * Execute the update immediately on calling
	 *
	 * @default true
	 */
	immediate?: boolean
}

/**
 * Reactive counter increases on every interval
 *
 * @param interval
 * @param options
 */
export function useInterval(
	interval?: number,
	options?: UseIntervalOptions<false>
): Readable<number>
export function useInterval(
	interval: number,
	options: UseIntervalOptions<true>
): { counter: Readable<number> } & Pauseable
export function useInterval(
	interval = 1000,
	options: UseIntervalOptions<boolean> = {}
) {
	const { controls: expose_controls = false, immediate = true } = options

	const counter = writable(0)
	const controls = useIntervalFn(
		() => {
			counter.update((c) => (c += 1))
		},
		interval,
		{ immediate }
	)

	if (expose_controls) {
		return {
			counter: toReadable(counter),
			...controls,
		}
	}
	return toReadable(counter)
}
