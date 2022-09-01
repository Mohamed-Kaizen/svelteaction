import jwt_decode from "jwt-decode"

import type { JwtDecodeOptions, JwtHeader, JwtPayload } from "jwt-decode"

export interface UseJwtOptions<Fallback> {
	/**
	 * Value returned when encounter error on decoding
	 *
	 * @default null
	 */
	fallbackValue?: Fallback

	/**
	 * Error callback for decoding
	 */
	onError?: (error: unknown) => void
}

export interface UseJwtReturn<Payload, Header, Fallback> {
	header: Header | Fallback
	payload: Payload | Fallback
}

/**
 *
 * @param jwt
 */
export function useJwt<
	Payload extends object = JwtPayload,
	Header extends object = JwtHeader,
	Fallback = null
>(
	encodedJwt: string,
	options: UseJwtOptions<Fallback> = {}
): UseJwtReturn<Payload, Header, Fallback> {
	const { onError, fallbackValue = null } = options

	const decodeWithFallback = <T extends object>(
		encodedJwt: string,
		options?: JwtDecodeOptions
	): T | Fallback => {
		try {
			return jwt_decode<T>(encodedJwt, options)
		} catch (err) {
			onError?.(err)
			return fallbackValue as Fallback
		}
	}

	const header = decodeWithFallback<Header>(encodedJwt, { header: true })

	const payload = decodeWithFallback<Payload>(encodedJwt)

	return {
		header,
		payload,
	}
}
