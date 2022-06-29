// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { PackageManifest } from "./types"

export const packages: PackageManifest[] = [
	{
		name: "shared",
		display: "Shared utilities",
	},
	{
		name: "core",
		display: "svelteaction",
		description: "Collection of essential Svelte Utilities",
	},
	{
		name: "integrations",
		display: "Integrations",
		description: "Integration wrappers for utility libraries",
		addon: true,
		submodules: true,
		external: ["@svelteaction/core", "@svelteaction/shared"],
	},
]
