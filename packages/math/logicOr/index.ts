/**
 * `NOT` conditions.
 *
 */
export function logicOr(...args: any[]): boolean {
	return args.some((i) => i)
}

// alias
export { logicOr as logic_or, logicOr as or }
