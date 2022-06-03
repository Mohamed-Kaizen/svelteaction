import type { SvelteActionFunction } from "./types"

export function getCategories(functions: SvelteActionFunction[]): string[] {
	return uniq(
		functions
			.filter((i) => !i.internal)
			.map((i) => i.category)
			.filter(Boolean)
	).sort((a, b) =>
		a.startsWith("@") && !b.startsWith("@")
			? 1
			: b.startsWith("@") && !a.startsWith("@")
			? -1
			: a.localeCompare(b)
	)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniq<T extends any[]>(a: T) {
	return Array.from(new Set(a))
}