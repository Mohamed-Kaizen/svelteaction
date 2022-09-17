export function sleep(
	ms: number,
	throwOnTimeout = false,
	reason = "Timeout"
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (throwOnTimeout) setTimeout(() => reject(reason), ms)
		else setTimeout(resolve, ms)
	})
}
