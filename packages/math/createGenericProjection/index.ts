export type ProjectorFunction<F, T> = (
	input: F,
	from: readonly [F, F],
	to: readonly [T, T]
) => T

export type UseProjection<F, T> = (input: F) => T

export function createGenericProjection<F = number, T = number>(
	fromDomain: readonly [F, F],
	toDomain: readonly [T, T],
	projector: ProjectorFunction<F, T>
): UseProjection<F, T> {
	return (input: F) => {
		return projector(input, fromDomain, toDomain)
	}
}
