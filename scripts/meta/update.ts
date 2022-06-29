import { join, relative, resolve } from "path"
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
import { getCategories } from "./utils"

export const DOCS_URL = "https://svelteaction.org"
export const DIR_PACKAGE = resolve(__dirname, "..")
export const DIR_ROOT = resolve(__dirname, "../../..")
export const DIR_SRC = resolve(DIR_ROOT, "packages")
export const DIR_TYPES = resolve(DIR_ROOT, "types/packages")

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
			docs: info.addon
				? `${DOCS_URL}/${info.name}/README.html`
				: undefined,
		}

		indexes.packages[info.name] = pkg

		await Promise.all(
			functions.map(async (fnName) => {
				const mdPath = join(dir, fnName, "index.md")
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

				if (!fs.existsSync(mdPath)) {
					fn.internal = true
					indexes.functions.push(fn)
					return
				}

				fn.docs = `${DOCS_URL}/${pkg.name}/${fnName}/`

				const mdRaw = await fs.readFile(mdPath, "utf-8")

				const { content: md, data: frontmatter } = matter(mdRaw)
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

				let description =
					(md
						.replace(/\r\n/g, "\n")
						.match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) ||
						[])[1] || ""

				description = description.trim()
				description =
					description.charAt(0).toLowerCase() + description.slice(1)

				fn.category = ["core", "shared"].includes(pkg.name)
					? category
					: `@${pkg.display}`
				fn.description = description

				if (description.includes("DEPRECATED")) fn.deprecated = true

				if (alias?.length) fn.alias = alias

				if (related?.length) fn.related = related

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
	await fs.writeJSON(join(DIR_PACKAGE, "index.json"), indexes, { spaces: 2 })
}

run()
