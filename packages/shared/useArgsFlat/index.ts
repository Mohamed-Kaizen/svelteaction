export type MaybeArgs<T> = T[] | [T[]]

export function useArgsFlat<T>(args: MaybeArgs<T>): T[] {
	return args.flatMap((i: any) => {
		const v = i
		if (Array.isArray(v)) return v.map((i) => i)
		return [v]
	})
}
