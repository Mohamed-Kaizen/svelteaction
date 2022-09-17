import { argsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get minimum of values
 *
 */
export function min(...args: MaybeArgs<number>): number {
	const array = argsFlat(args)
	return Math.min(...array)
}
