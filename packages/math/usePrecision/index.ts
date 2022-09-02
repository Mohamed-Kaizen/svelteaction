export interface UsePrecisionOptions {
	/**
	 * Method to use for rounding
	 *
	 * @default 'round'
	 */
	math?: "floor" | "ceil" | "round"
}

/**
 * Set the precision of a number.
 *
 */
export function usePrecision(
	value: number,
	digits: number,
	options?: UsePrecisionOptions
): number | string {
	const power = 10 ** digits
	return Math[options?.math || "round"](value * power) / power
}

// alias
export { usePrecision as use_precision, usePrecision as precision }
