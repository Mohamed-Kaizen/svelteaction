import type { ArgumentsType } from "@svelteaction/shared"

export type UseMathKeys = keyof {
	[K in keyof Math as Math[K] extends (...args: any) => any
		? K
		: never]: unknown
}

/**
 * Math methods.
 *
 */
export function math<K extends keyof Math>(
	key: K,
	...args: ArgumentsType<Math[K]>
): number {
	return (Math[key] as any)(...args) as any
}
