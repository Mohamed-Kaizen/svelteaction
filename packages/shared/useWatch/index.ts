import { writable } from "svelte/store"

export function useWatch<T>(target: T, fn: (o: T, n: T) => void) {
	const { subscribe, update } = writable(target)
	return {
		subscribe,
		set: (value: T) => {
			update((oldValue) => {
				fn(oldValue, value)
				return value
			})
		},
	}
}

// alias
export { useWatch as use_watch, useWatch as watch }
