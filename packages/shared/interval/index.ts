import { writable } from "svelte/store"

import { intervalFn } from "../intervalFn"
import { toReadable } from "../utils"

import type { Readable } from "svelte/store"

import type { Pauseable } from "../utils"

export interface IntervalOptions<Controls extends boolean> {
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
export function interval(
	interval?: number,
	options?: IntervalOptions<false>
): Readable<number>
export function interval(
	interval: number,
	options: IntervalOptions<true>
): { counter: Readable<number> } & Pauseable
export function interval(
	interval = 1000,
	options: IntervalOptions<boolean> = {}
) {
	const { controls: expose_controls = false, immediate = true } = options

	const counter = writable(0)
	const controls = intervalFn(
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
