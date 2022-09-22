/**
 * `Array.every`
 *
 * @param {Array} list - the array was called upon.
 * @param fn - a function to test each element.
 *
 * @returns {boolean} **true** if the `fn` function returns a **truthy** value for every element from the array. Otherwise, **false**.
 */
export function every<T>(
	list: T[],
	fn: (element: T, index: number, array: T[]) => unknown
): boolean {
	return list.every((element, index, array) => {
		return fn(element, index, array)
	})
}
