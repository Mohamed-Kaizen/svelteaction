import { makeDestructurable } from "../makeDestructurable"
import { toReadable } from "../toReadable"
import { toWritable } from "../toWritable"
import { watchable } from "../watchable"

export interface LastChangedOptions {
	defaultValue?: number
}

export function lastChanged<T>(target: T, options?: LastChangedOptions) {
	const ms = toWritable(options?.defaultValue ?? +Date.now())

	const value = watchable(target, () => ms.set(+Date.now()))

	return makeDestructurable(
		{ value, ms: toReadable(ms) } as const,
		[value, toReadable(ms)] as const
	)
}

// alias
export { lastChanged as last_changed }
