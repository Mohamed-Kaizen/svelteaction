import { reduce } from "../reduce"

export function select<T, K>(
	list: T[],
	fn: (item: T) => K,
	condition: (item: T) => boolean
) {
	return reduce(
		list,
		(acc, item) => {
			if (!condition(item)) return acc
			return [...acc, fn(item)]
		},
		[] as K[]
	)
}
