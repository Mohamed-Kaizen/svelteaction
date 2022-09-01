export interface UseToNumberOptions {
	/**
	 * Method to use to convert the value to a number.
	 *
	 * @default 'float'
	 */
	method?: "float" | "int"

	/**
	 * The base in mathematical numeral systems passed to `parseInt`.
	 * Only works with `method: 'parseInt'`
	 */
	radix?: number

	/**
	 * Replace NaN with zero
	 *
	 * @default false
	 */
	nanToZero?: boolean
}

export function useToNumber(
	value: number | string,
	options: UseToNumberOptions = {}
): number {
	const { method, radix, nanToZero } = options

	let _method: "parseFloat" | "parseInt" = "parseFloat"

	if (method === "int") _method = "parseInt"

	let resolved =
		typeof value === "number" ? value : Number[_method](value, radix)

	if (nanToZero && isNaN(resolved)) resolved = 0

	return resolved
}
