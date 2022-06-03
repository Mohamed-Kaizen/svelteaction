export interface PackageManifest {
	name: string
	display: string
	addon?: boolean
	author?: string
	description?: string
	external?: string[]
	manualImport?: boolean
	deprecated?: boolean
	submodules?: boolean
}

export interface SvelteActionFunction {
	name: string
	package: string
	category?: string
	description?: string
	docs?: string
	depreacted?: boolean
	internal?: boolean
	component?: boolean
	directive?: boolean
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
