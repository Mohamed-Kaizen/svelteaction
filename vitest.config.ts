import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
	resolve: {
		alias: {
			"@svelteaction/shared": resolve(
				__dirname,
				"packages/shared/index.ts"
			),
			"@svelteaction/core": resolve(__dirname, "packages/core/index.ts"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: [resolve(__dirname, "packages/.test/setup.ts")],
		reporters: "dot",
	},
})
