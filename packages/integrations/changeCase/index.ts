import * as _changeCase from "./changeCase"

import type { Options } from "change-case"

export type ChangeCaseType = keyof typeof _changeCase

/**
 * Wrapper for change-case
 *
 */
export function changeCase(
	input: string,
	type: ChangeCaseType,
	options?: Options | undefined
) {
	return _changeCase[type](input, options)
}

// alias
export { changeCase as change_case }
