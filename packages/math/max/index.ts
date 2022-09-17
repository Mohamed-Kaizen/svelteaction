import { argsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get maximum of values
 *
 */
export function max(...args: MaybeArgs<number>): number {
	const array = argsFlat(args)
	return Math.max(...array)
}
