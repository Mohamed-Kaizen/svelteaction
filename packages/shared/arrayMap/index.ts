/**
 * `Array.map`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function that is called for every element of the given `list`. Each time `fn` executes, the returned value is added to the new array.
 *
 * @returns {Array} a new array with each element being the result of the callback function.
 */
export function arrayMap<T, U = T>(
	list: T[],
	fn: (element: T, index: number, array: T[]) => U
): U[] {
	return list.map(fn)
}

// alias
export { arrayMap as array_map }
