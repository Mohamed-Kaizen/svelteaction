import { useArgsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get maximum of values
 *
 */
export function useMax(...args: MaybeArgs<number>): number {
	const array = useArgsFlat(args)
	return Math.max(...array)
}

// alias
export { useMax as use_max, useMax as max }
