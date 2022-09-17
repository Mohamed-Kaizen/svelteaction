/**
 * `Array.findIndex`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns {number} the index of the first element in the array that passes the test. Otherwise, "-1".
 */
export function arrayFindIndex<T>(
	list: T[],
	fn: (element: T, index: number, array: T[]) => unknown
): number {
	return list.findIndex((element, index, array) => {
		return fn(element, index, array)
	})
}
// alias
export { arrayFindIndex as array_find_index }
