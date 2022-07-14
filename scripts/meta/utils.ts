import type { SvelteActionFunction } from "./types"
import { resolve } from "path"

export const DOCS_URL = "https://svelteaction.org"
export const DIR_ROOT = resolve(__dirname, "../../")
export const DIR_SRC = resolve(DIR_ROOT, "packages")
export const DIR_DOCS = resolve(DIR_ROOT, "docs")
export const DIR_DOCS_ROUTE = resolve(DIR_DOCS, "src/routes/docs")

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

export function getPackageDocIndex(name: string): number {
	if (name === "core") {
		return 2
	}
	if (name === "shared") {
		return 4
	}
	if (name === "integrations") {
		return 3
	}
	return 0
}
