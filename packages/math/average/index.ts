import { argsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get the average of an array
 *
 */
export function average(...args: MaybeArgs<number>): number {
	const array = argsFlat(args)
	return array.reduce((sum, v) => (sum += v), 0) / array.length
}
