import { useArgsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get the sum of a set of numbers.
 *
 */
export function useSum(...args: MaybeArgs<number>): number {
	const array = useArgsFlat(args)
	return array.reduce((sum, v) => (sum += v), 0)
}

// alias
export { useSum as use_average, useSum as sum }
