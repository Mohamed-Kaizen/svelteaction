import { readable } from "svelte/store"

import { isReadable, isWritable } from "../utils"

import type { Readable } from "svelte/store"

import type { MaybeReadable, MaybeWritable } from "../utils"

export function toReadable<T>(
	val: MaybeReadable<T> | MaybeWritable<T>
): Readable<T> {
	if (isWritable(val)) {
		return {
			subscribe: val.subscribe,
		}
	}

	return isReadable(val) ? val : readable(val)
}

// alias
export { toReadable as to_readable }
