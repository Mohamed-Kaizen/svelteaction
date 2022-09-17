export type MaybeArgs<T> = T[] | [T[]]

export function argsFlat<T>(args: MaybeArgs<T>): T[] {
	return args.flatMap((i: any) => {
		const v = i
		if (Array.isArray(v)) return v.map((i) => i)
		return [v]
	})
}

// alias
export { argsFlat as args_flat }
