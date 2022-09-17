import { onDestroy } from "svelte"

import { tryGetCurrentComponent } from "../utils"

import type { Fn } from "../utils"

/**
 * Call onDestroy() if it's inside a component lifecycle, if not, do nothing.
 *
 * @param fn
 */
export function tryOnDestroy(fn: Fn) {
	if (tryGetCurrentComponent()) {
		onDestroy(fn)
	}
}

// alias
export { tryOnDestroy as try_on_destroy }
