/**
 * `Array.find`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
 */
export function arrayFind<T>(
	list: T[],
	fn: (element: T, index: number, array: T[]) => unknown
): T | undefined {
	return list.find((element, index, array) => {
		return fn(element, index, array)
	})
}

// alias
export { arrayFind as array_find }
