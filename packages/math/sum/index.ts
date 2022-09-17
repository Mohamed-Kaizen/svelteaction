import { argsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get the sum of a set of numbers.
 *
 */
export function sum(...args: MaybeArgs<number>): number {
	const array = argsFlat(args)
	return array.reduce((sum, v) => (sum += v), 0)
}
