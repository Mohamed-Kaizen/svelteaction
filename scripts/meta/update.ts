import { join, relative } from "path"
import fs from "fs-extra"
import matter from "gray-matter"
import type {
	PackageIndexes,
	SvelteActionFunction,
	SvelteActionPackage,
} from "./types"
import fg from "fast-glob"
import Git from "simple-git"
import { packages } from "./packages"
import {
	getCategories,
	DOCS_URL,
	DIR_ROOT,
	DIR_SRC,
	DIR_DOCS_ROUTE,
	getPackageDocIndex,
} from "./utils"
import consola from "consola"

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
		if (info.utils) continue

		const dir = join(DIR_SRC, info.name)

		const functions = await listFunctions(dir)

		const pkg: SvelteActionPackage = {
			...info,
			dir: relative(DIR_ROOT, dir).replace(/\\/g, "/"),
		}

		indexes.packages[info.name] = pkg

		const docsPath = `${DIR_DOCS_ROUTE}/[...${getPackageDocIndex(
			info.name
		)}]${info.name}`

		!fs.existsSync(docsPath) && fs.mkdirSync(docsPath)

		await Promise.all(
			functions.map(async (fnName) => {
				const mdPath = join(dir, fnName, "index.md")
				const tsPath = join(dir, fnName, "index.ts")
				const demoPath = join(dir, fnName, "demo.svelte")

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

				if (!fs.existsSync(mdPath)) {
					fn.internal = true
					indexes.functions.push(fn)
					return
				}
				if (!fs.existsSync(demoPath)) {
					consola.error(
						`No demo.svelte in ${fnName}, please add one.`
					)
					return
				}

				fn.docs = `${DOCS_URL}/${pkg.name}/${fnName}/`

				const mdRaw = await fs.readFile(mdPath, "utf-8")

				const { data: frontmatter } = matter(mdRaw)

				const category = frontmatter.category

				let alias = frontmatter.alias

				if (typeof alias === "string")
					alias = alias
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean)
				let related = frontmatter.related

				if (typeof related === "string")
					related = related
						.split(",")
						.map((s) => s.trim())
						.filter(Boolean)

				const description = frontmatter.description?.trim() ?? ""

				fn.category = ["core", "shared"].includes(pkg.name)
					? category
					: `@${pkg.display}`

				fn.description = description

				if (description.includes("DEPRECATED")) fn.deprecated = true

				if (alias?.length) fn.alias = alias

				if (related?.length) fn.related = related

				await fs.copyFile(demoPath, join(docsPath, `_${fnName}.svelte`))

				indexes.functions.push(fn)
			})
		)
	}

	indexes.functions.sort((a: SvelteActionFunction, b: SvelteActionFunction) =>
		a.name.localeCompare(b.name)
	)

	indexes.categories = getCategories(indexes.functions)

	// interop related
	indexes.functions.forEach((fn: SvelteActionFunction) => {
		if (!fn.related) return

		fn.related.forEach((name: string) => {
			const target = indexes.functions.find(
				(f: SvelteActionFunction) => f.name === name
			)
			if (!target) throw new Error(`Unknown related function: ${name}`)
			if (!target.related) target.related = []
			if (!target.related.includes(fn.name)) target.related.push(fn.name)
		})
	})

	indexes.functions.forEach((fn: SvelteActionFunction) => fn.related?.sort())

	return indexes
}

async function run() {
	const indexes = await readMetadata()
	await fs.writeJSON(join(__dirname, "index.json"), indexes, { spaces: 2 })
}

run()
