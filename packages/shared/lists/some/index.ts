/**
 * `Array.some`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns {boolean} **true** if the `fn` function returns a **truthy** value for any element from the array. Otherwise, **false**.
 */
export function some<T>(
	list: T[],
	fn: (element: T, index: number, array: T[]) => unknown
): boolean {
	return list.some((element, index, array) => {
		return fn(element, index, array)
	})
}
