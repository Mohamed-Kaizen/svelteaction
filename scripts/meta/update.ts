import fs from "fs-extra"
import fg from "fast-glob"
import { join, relative } from "path"
import Git from "simple-git"

import { packages } from "./packages"
import { DIR_ROOT, DIR_SRC } from "./utils"

import type {
	PackageIndexes,
	SvelteActionFunction,
	SvelteActionPackage,
} from "./types"

export const git = Git(DIR_ROOT)

export async function listFunctions(dir: string, ignore: string[] = []) {
	const files = await fg("*", {
		onlyDirectories: true,
		cwd: dir,
		ignore: ["_*", "dist", "node_modules", ...ignore],
	})

	files.sort()
	return files
}

export async function readMetadata() {
	const indexes: PackageIndexes = {
		packages: {},
		categories: [],
		functions: [],
	}

	for (const info of packages) {
		const dir = join(DIR_SRC, info.name)

		const functions = await listFunctions(dir)

		const pkg: SvelteActionPackage = {
			...info,
			dir: relative(DIR_ROOT, dir).replace(/\\/g, "/"),
		}

		indexes.packages[info.name] = pkg

		await Promise.all(
			functions.map(async (fnName) => {
				const tsPath = join(dir, fnName, "index.ts")

				const fn: SvelteActionFunction = {
					name: fnName,
					package: pkg.name,
					lastUpdated:
						+(await git.raw([
							"log",
							"-1",
							"--format=%at",
							tsPath,
						])) * 1000,
				}

				indexes.functions.push(fn)
			})
		)
	}

	indexes.functions.sort((a: SvelteActionFunction, b: SvelteActionFunction) =>
		a.name.localeCompare(b.name)
	)

	return indexes
}

async function run() {
	const indexes = await readMetadata()
	await fs.writeJSON(join(__dirname, "index.json"), indexes, { spaces: 2 })
}

run()
