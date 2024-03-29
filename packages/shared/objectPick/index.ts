/**
 * Create a new subset object by giving keys
 *
 * @category Object
 */
export function objectPick<O, T extends keyof O>(
	obj: O,
	keys: T[],
	omitUndefined = false
) {
	return keys.reduce((n, k) => {
		if (k in obj) {
			if (!omitUndefined || obj[k] !== undefined) n[k] = obj[k]
		}
		return n
	}, {} as Pick<O, T>)
}

// alias
export { objectPick as object_pick }
