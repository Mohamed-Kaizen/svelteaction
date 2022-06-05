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
		// dedupe: ["vue", "vue-demi", "@vue/runtime-core"],
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: [resolve(__dirname, "packages/.test/setup.ts")],
		reporters: "dot",
		// deps: {
		// 	inline: ["vue2", "@vue/composition-api", "vue-demi"],
		// },
	},
})
