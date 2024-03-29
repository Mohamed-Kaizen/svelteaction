import { get_current_component } from "svelte/internal"

/**
 * Silent `get_current_component`. Call `get_current_component()` without throw error.
 */
export function tryGetCurrentComponent() {
	let currentComponent

	try {
		currentComponent = get_current_component()
	} catch (_) {}

	return currentComponent
}

// alias
export { tryGetCurrentComponent as try_get_current_component }
