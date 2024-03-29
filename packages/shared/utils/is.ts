import type { Readable, Writable } from "svelte/store"

export const isClient = typeof window !== "undefined"

export const isDef = <T = any>(val?: T): val is T => typeof val !== "undefined"

export const assert = (condition: boolean, ...infos: any[]) => {
	if (!condition) console.warn(...infos)
}
const toString = Object.prototype.toString

export const isBoolean = (val: any): val is boolean => typeof val === "boolean"

export const isFunction = <T extends Function>(val: any): val is T =>
	typeof val === "function"

export const isNumber = (val: any): val is number => typeof val === "number"

export const isString = (val: unknown): val is string => typeof val === "string"

export const isObject = (val: any): val is object =>
	toString.call(val) === "[object Object]"

export const isWindow = (val: any): val is Window =>
	typeof window !== "undefined" && toString.call(val) === "[object Window]"

export const isReadable = <T>(store: any): store is Readable<T> => {
	return store && isFunction(store.subscribe)
}

export const isWritable = <T>(store: any): store is Writable<T> => {
	return (
		store &&
		["subscribe", "set", "update"].every((n) => isFunction(store[n]))
	)
}

export const now = () => Date.now()

export const timestamp = () => +Date.now()

export const noop = () => {}

export const isIOS =
	/* #__PURE__ */ isClient &&
	window?.navigator?.userAgent &&
	/iP(ad|hone|od)/.test(window.navigator.userAgent)
