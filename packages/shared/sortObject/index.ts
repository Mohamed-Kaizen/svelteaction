export function sortObject(obj: { [key: string]: any }) {
	return Object.keys(obj)
		.sort()
		.reduce(function (result: { [key: string]: any }, key: string) {
			result[key] = obj[key]
			return result
		}, {})
}

// alias
export { sortObject as sort_object }
