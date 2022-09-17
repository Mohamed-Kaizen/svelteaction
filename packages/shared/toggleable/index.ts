import { get } from "svelte/store"

import { isWritable, toWritable, toReadable } from "../utils"

import type { Writable, Readable } from "svelte/store"

import type { MaybeWritable } from "../utils"

/**
 * A boolean store with a toggler
 *
 * @param [initialValue=false]
 */
export function toggleable(
	value: Writable<boolean>
): (value?: boolean) => boolean
export function toggleable(
	initialValue?: MaybeWritable<boolean>
): [Readable<boolean>, (value?: boolean) => boolean]
export function toggleable(initialValue: MaybeWritable<boolean> = false) {
	if (isWritable(initialValue)) {
		return (value?: boolean) => {
			initialValue.set(
				typeof value === "boolean" ? value : !get(initialValue)
			)
		}
	} else {
		const store = toWritable(initialValue)

		const toggle = (value?: boolean) => {
			store.set(typeof value === "boolean" ? value : !get(store))
		}

		return [toReadable(store), toggle] as const
	}
}
