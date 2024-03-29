/**
 * `Array.filter`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function that is called for every element of the given `list`. Each time `fn` executes, the returned value is added to the new array.
 *
 * @returns {Array} a shallow copy of a portion of the given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. If no elements pass the test, an empty array will be returned.
 */
export function filter<T>(
	list: T[],
	fn: (element: T, index: number, array: T[]) => boolean
): T[] {
	return list.filter(fn)
}
