import QRCode from "qrcode"
import { writable } from "svelte/store"

import { makeDestructurable } from "@svelteaction/shared"

/**
 * Wrapper for qrcode.
 *
 * @param text
 * @param options
 */
export function qrCode(text: string, options?: QRCode.QRCodeToDataURLOptions) {
	const output = writable<string>("")
	const pending = writable(true)
	const error = writable<boolean | unknown>(false)

	async function generate() {
		pending.set(true)
		error.set(false)
		try {
			output.set(await QRCode.toDataURL(text, options))
		} catch (e) {
			error.set(e)
		}
		pending.set(false)
	}

	generate()

	return makeDestructurable(
		{ output, pending, error } as const,
		[output, pending, error] as const
	)
}

// alias
export { qrCode as qr_code }
