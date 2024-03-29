export type EventHookOn<T = any> = (fn: (param: T) => void) => {
	off: () => void
}
export type EventHookOff<T = any> = (fn: (param: T) => void) => void
export type EventHookTrigger<T = any> = (param: T) => void

export interface EventHook<T = any> {
	on: EventHookOn<T>
	off: EventHookOff<T>
	trigger: EventHookTrigger<T>
}

/**
 * Utility for creating event hooks
 *
 */
export function createEventHook<T = any>(): EventHook<T> {
	const fns: Array<(param: T) => void> = []

	const off = (fn: (param: T) => void) => {
		const index = fns.indexOf(fn)
		if (index !== -1) fns.splice(index, 1)
	}

	const on = (fn: (param: T) => void) => {
		fns.push(fn)

		return {
			off: () => off(fn),
		}
	}

	const trigger = (param: T) => {
		fns.forEach((fn) => fn(param))
	}

	return {
		on,
		off,
		trigger,
	}
}
