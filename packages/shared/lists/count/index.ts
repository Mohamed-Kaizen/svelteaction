import { reduce } from "../reduce"

export function count<T, TId extends string | number | symbol>(
	list: T[],
	fn: (item: T) => TId
): Record<TId, number> {
	return reduce(
		list,
		(acc, item) => {
			const id = fn(item)
			return {
				...acc,
				[id]: (acc[id] ?? 0) + 1,
			}
		},
		{} as Record<TId, number>
	)
}
