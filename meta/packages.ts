// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { PackageManifest } from "@svelteaction/metadata"

export const packages: PackageManifest[] = [
	{
		name: "metadata",
		display: "Metadata for SvelteAction functions",
		manualImport: true,
		iife: false,
		utils: true,
		target: "node14",
	},
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
		external: [
			"axios",
			"universal-cookie",
			"qrcode",
			"http",
			"nprogress",
			"jwt-decode",
			"focus-trap",
			"change-case",
			"drauu",
			"@svelteaction/core",
			"@svelteaction/shared",
			"fuse.js",
		],
		globals: {
			axios: "axios",
			"universal-cookie": "UniversalCookie",
			qrcode: "QRCode",
			nprogress: "nprogress",
			"jwt-decode": "jwt_decode",
			"focus-trap": "focusTrap",
			drauu: "Drauu",
			"fuse.js": "Fuse",
			"change-case": "changeCase",
		},
	},
]
