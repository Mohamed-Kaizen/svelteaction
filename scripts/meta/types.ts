export interface PackageManifest {
	name: string
	display: string
	addon?: boolean
	author?: string
	description?: string
	external?: string[]
	globals?: Record<string, string>
	submodules?: boolean
	build?: boolean
	iife?: boolean
	cjs?: boolean
	mjs?: boolean
	dts?: boolean
	target?: string
}

export interface SvelteActionFunction {
	name: string
	package: string
	lastUpdated?: number
	category?: string
	description?: string
}

export interface SvelteActionPackage extends PackageManifest {
	dir: string
	docs?: string
}

export interface PackageIndexes {
	packages: Record<string, SvelteActionPackage>
	categories: string[]
	functions: SvelteActionFunction[]
}
