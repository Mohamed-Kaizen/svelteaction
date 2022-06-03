export interface PackageManifest {
	name: string
	display: string
	addon?: boolean
	author?: string
	description?: string
	external?: string[]
	globals?: Record<string, string>
	manualImport?: boolean
	deprecated?: boolean
	submodules?: boolean
	build?: boolean
	iife?: boolean
	cjs?: boolean
	mjs?: boolean
	dts?: boolean
	target?: string
	utils?: boolean
	copy?: string[]
}

export interface SvelteActionFunction {
	name: string
	package: string
	lastUpdated?: number
	category?: string
	description?: string
	docs?: string
	deprecated?: boolean
	internal?: boolean
	component?: boolean
	directive?: boolean
	external?: string
	alias?: string[]
	related?: string[]
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

export interface CommitInfo {
	functions: string[]
	version?: string
	hash: string
	date: string
	message: string
	refs?: string
	body?: string
	author_name: string
	author_email: string
}

export interface ContributorInfo {
	name: string
	count: number
	hash: string
}
