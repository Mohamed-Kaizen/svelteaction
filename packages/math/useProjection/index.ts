import { createProjection } from "../createProjection"

import type { ProjectorFunction } from "../createGenericProjection"

/**
 * Numeric projection from one domain to another.
 *
 */
export function useProjection(
	input: number,
	fromDomain: readonly [number, number],
	toDomain: readonly [number, number],
	projector?: ProjectorFunction<number, number>
) {
	return createProjection(fromDomain, toDomain, projector)(input)
}

// alias
export { useProjection as use_projection, useProjection as projection }
