export type ProjectorFunction<F, T> = (
	input: F,
	from: readonly [F, F],
	to: readonly [T, T]
) => T

export type Projection<F, T> = (input: F) => T

export function createGenericProjection<F = number, T = number>(
	fromDomain: readonly [F, F],
	toDomain: readonly [T, T],
	projector: ProjectorFunction<F, T>
): Projection<F, T> {
	return (input: F) => {
		return projector(input, fromDomain, toDomain)
	}
}
