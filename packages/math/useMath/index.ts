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
export function useMath<K extends keyof Math>(
	key: K,
	...args: ArgumentsType<Math[K]>
): number {
	return (Math[key] as any)(...args) as any
}

// alias
export { useMath as use_math }
