import { get, writable } from "svelte/store"

import { isReadable, isWritable } from "../utils"

import type { Writable } from "svelte/store"

import type { MaybeReadable, MaybeWritable } from "../utils"

export function toWritable<T>(
	val: MaybeReadable<T> | MaybeWritable<T>
): Writable<T> {
	if (isWritable(val)) return val

	if (isReadable(val)) return writable(get(val))

	return writable(val)
}

// alias
export { toWritable as to_writable }
