/**
 * `AND` conditions.
 *
 */
export function logicAnd(...args: any[]): boolean {
	return args.every((i) => i)
}

// alias
export { logicAnd as and }
