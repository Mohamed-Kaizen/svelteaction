/**
 * Clamp a value between two other values.
 *
 * @param value number
 * @param min
 * @param max
 */
export function useClamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value))
}

// alias
export { useClamp as use_clamp, useClamp as clamp }
