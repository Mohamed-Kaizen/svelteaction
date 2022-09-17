import { get } from "svelte/store"

import { isReadable } from "../utils"

import type { MaybeReadable, MaybeWritable } from "../utils"

export function unstore<T>(val: MaybeReadable<T> | MaybeWritable<T>): T {
	return isReadable(val) ? get(val) : val
}
