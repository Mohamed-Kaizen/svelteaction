import { createGenericProjection } from "../createGenericProjection"

import type { ProjectorFunction, Projection } from "../createGenericProjection"

const defaultNumericProjector = (
	input: number,
	from: readonly [number, number],
	to: readonly [number, number]
) => {
	return ((input - from[0]) / (from[1] - from[0])) * (to[1] - to[0]) + to[0]
}

export function createProjection(
	fromDomain: readonly [number, number],
	toDomain: readonly [number, number],
	projector: ProjectorFunction<number, number> = defaultNumericProjector
): Projection<number, number> {
	return createGenericProjection(fromDomain, toDomain, projector)
}

// alias
export { createProjection as create_projection }
