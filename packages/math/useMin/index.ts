import { useArgsFlat } from "@svelteaction/shared"

import type { MaybeArgs } from "@svelteaction/shared"

/**
 * Get minimum of values
 *
 */
export function useMin(...args: MaybeArgs<number>): number {
	const array = useArgsFlat(args)
	return Math.min(...array)
}

// alias
export { useMin as use_min, useMin as min }
