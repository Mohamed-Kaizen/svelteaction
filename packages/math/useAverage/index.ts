import { useArgsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get the average of an array
 *
 */
export function useAverage(...args: MaybeArgs<number>): number {
	const array = useArgsFlat(args)
	return array.reduce((sum, v) => (sum += v), 0) / array.length
}

// alias
export { useAverage as use_average }
