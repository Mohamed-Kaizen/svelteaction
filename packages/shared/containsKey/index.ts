export function containsKey(obj: object, ...keys: string[]) {
	return keys.some((key) => key in obj)
}

// alias
export { containsKey as contains_key }
