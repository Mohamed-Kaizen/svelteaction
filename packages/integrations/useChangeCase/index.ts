import * as changeCase from "./changeCase"

import type { Options } from "change-case"

export type ChangeCaseType = keyof typeof changeCase

/**
 * Wrapper for change-case
 *
 */
export function useChangeCase(
	input: string,
	type: ChangeCaseType,
	options?: Options | undefined
) {
	return changeCase[type](input, options)
}

// alias
export { useChangeCase as use_change_case }
