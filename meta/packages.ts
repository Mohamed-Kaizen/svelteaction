// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { PackageManifest } from "@svelteaction/metadata"

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
		name: "math",
		display: "Math",
		description: "Math functions for Svelte",
		external: ["@svelteaction/shared"],
	},
	{
		name: "integrations",
		display: "Integrations",
		description: "Integration wrappers for utility libraries",
		addon: true,
		submodules: true,
		external: [
			"qrcode",
			"jwt-decode",
			"change-case",
			"@svelteaction/core",
			"@svelteaction/shared",
		],
		globals: {
			qrcode: "QRCode",
			"jwt-decode": "jwt_decode",
			"change-case": "changeCase",
		},
	},
]
