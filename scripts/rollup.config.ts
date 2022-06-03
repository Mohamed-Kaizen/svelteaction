import { resolve } from "path"
import type { Options as ESBuildOptions } from "rollup-plugin-esbuild"
import esbuild from "rollup-plugin-esbuild"
import dts from "rollup-plugin-dts"
import json from "@rollup/plugin-json"
import type { OutputOptions, RollupOptions } from "rollup"
import fg from "fast-glob"
import { packages } from "../meta/packages"

const configs: RollupOptions[] = []

const esbuildPlugin = esbuild()

const dtsPlugin = [dts()]

const externals = [
	"@svelteaction/shared",
	"@svelteaction/core",
	"@svelteaction/metadata",
]

const esbuildMinifer = (options: ESBuildOptions) => {
	const { renderChunk } = esbuild(options)

	return {
		name: "esbuild-minifer",
		renderChunk,
	}
}

for (const {
	globals,
	name,
	external,
	submodules,
	iife,
	build,
	cjs,
	mjs,
	dts,
	target,
} of packages) {
	if (build === false) continue

	const iifeGlobals = {
		"@svelteaction/shared": "SvelteAction",
		"@svelteaction/core": "SvelteAction",
		...(globals || {}),
	}

	const iifeName = "SvelteAction"
	const functionNames = ["index"]

	if (submodules)
		functionNames.push(
			...fg
				.sync("*/index.ts", { cwd: resolve(`packages/${name}`) })
				.map((i) => i.split("/")[0])
		)

	for (const fn of functionNames) {
		const input =
			fn === "index"
				? `packages/${name}/index.ts`
				: `packages/${name}/${fn}/index.ts`

		const output: OutputOptions[] = []

		if (mjs !== false) {
			output.push({
				file: `packages/${name}/dist/${fn}.mjs`,
				format: "es",
			})
		}

		if (cjs !== false) {
			output.push({
				file: `packages/${name}/dist/${fn}.cjs`,
				format: "cjs",
			})
		}

		if (iife !== false) {
			output.push(
				{
					file: `packages/${name}/dist/${fn}.iife.js`,
					format: "iife",
					name: iifeName,
					extend: true,
					globals: iifeGlobals,
				},
				{
					file: `packages/${name}/dist/${fn}.iife.min.js`,
					format: "iife",
					name: iifeName,
					extend: true,
					globals: iifeGlobals,
					plugins: [
						esbuildMinifer({
							minify: true,
						}),
					],
				}
			)
		}

		configs.push({
			input,
			output,
			plugins: [target ? esbuild({ target }) : esbuildPlugin, json()],
			external: [...externals, ...(external || [])],
		})

		if (dts !== false) {
			configs.push({
				input,
				output: {
					file: `packages/${name}/dist/${fn}.d.ts`,
					format: "es",
				},
				plugins: dtsPlugin,
				external: [...externals, ...(external || [])],
			})
		}
	}
}

export default configs
