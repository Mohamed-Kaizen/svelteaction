export type Reducer<PV, CV, R> = (
	previousValue: PV,
	currentValue: CV,
	currentIndex: number
) => R

/**
 * `Array.reduce`
 *
 * @param {Array} list - the array was called upon.
 * @param reducer - a "reducer" function.
 *
 * @returns the value that results from running the "reducer" callback function to completion over the entire array.
 */
export function reduce<T>(list: T[], reducer: Reducer<T, T, T>): T

/**
 * `Array.reduce`
 *
 * @param {Array} list - the array was called upon.
 * @param reducer - a "reducer" function.
 * @param initialValue - a value to be initialized the first time when the callback is called.
 *
 * @returns the value that results from running the "reducer" callback function to completion over the entire array.
 */
export function reduce<T, U>(
	list: T[],
	reducer: Reducer<U, T, U>,
	initialValue: U
): U

/**
 * `Array.reduce`
 *
 * @param {Array} list - the array was called upon.
 * @param reducer - a "reducer" function.
 * @param args
 *
 * @returns the value that results from running the "reducer" callback function to completion over the entire array.
 */
export function reduce<T>(
	list: T[],
	reducer: (...p: any[]) => any,
	...args: any[]
): T {
	const reduceCallback = (sum: any, value: any, index: number) =>
		reducer(sum, value, index)

	return args.length
		? list.reduce(reduceCallback, args[0])
		: list.reduce(reduceCallback)
}
