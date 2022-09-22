import { filter } from "../filter"
import { reduce } from "../reduce"
import { some } from "../some"

export interface IntersectsOptions<T, K extends string | number | symbol> {
	fn?: (item: T) => K
}

export function intersects<T, K extends string | number | symbol>(
	listA: T[],
	listB: T[],
	options: IntersectsOptions<T, K> = {}
): [boolean, T[]] {
	const { fn = (item: T) => item as unknown as K } = options

	if (!listA || !listB) return [false, []]

	const dictB = reduce(
		listB,
		(acc, item) => ({ ...acc, [fn(item)]: true }),
		{} as Record<K, boolean>
	)

	return [
		some(listA, (item) => dictB[fn(item)]),
		filter(listA, (item) => dictB[fn(item)]),
	]
}
