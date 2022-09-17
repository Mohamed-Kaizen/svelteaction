import { writable } from "svelte/store"

/**
 * Adjust a value with unit
 *
 * @example '2px' + 1 = '3px'
 * @example '2px' - 1 = '2px'
 * @example '15em' + (-2) = '13em'
 * @example '15em' - (-2) = '17em'
 */
export function adjustWithUnit(target: string | number, delta: number) {
	const { subscribe, update } = writable(target)

	function updateValue(_target: string | number, type: string) {
		if (typeof _target === "number")
			return type === "inc" ? _target + delta : _target - delta

		const value = _target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ""

		const unit = _target.slice(value.length)

		const result =
			type === "inc"
				? parseFloat(value) + delta
				: parseFloat(value) - delta

		if (Number.isNaN(result)) return _target

		return result + unit
	}
	return {
		subscribe,
		inc: () => update((n) => updateValue(n, "inc")),
		dec: () => update((n) => updateValue(n, "dec")),
	}
}

// alias
export { adjustWithUnit as adjust_with_unit }
