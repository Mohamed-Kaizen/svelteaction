import { join, resolve } from "path"
import fs from "fs-extra"
import matter from "gray-matter"
import YAML from "js-yaml"
import Git from "simple-git"
import type { PackageIndexes, SvelteActionFunction } from "./meta/types"
import { $fetch } from "ohmyfetch"
import { packages } from "./meta/packages"
import {
	getCategories,
	DIR_ROOT,
	DIR_SRC,
	DIR_DOCS_ROUTE,
	getPackageDocIndex,
} from "./meta/utils"

export const git = Git()

const DIR_TYPES = resolve(__dirname, "../types/packages")

export async function updateImport({ packages, functions }: PackageIndexes) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	for (const { name, dir, manualImport } of Object.values(packages)) {
		if (manualImport) continue

		let imports: string[] = []

		imports = functions
			.filter((i) => i.package === name)
			.map((f) => f.name)
			.sort()
			.map((name) => `export * from './${name}'`)

		if (name === "core") {
			imports.push(
				"export * from './types'",
				"export * from '@svelteaction/shared'"
			)
		}

		await fs.writeFile(join(dir, "index.ts"), `${imports.join("\n")}\n`)
	}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniq<T extends any[]>(a: T) {
	return Array.from(new Set(a))
}

export function stringifyFunctions(
	functions: SvelteActionFunction[],
	title = true
) {
	let list = ""

	const categories = getCategories(functions)

	for (const category of categories) {
		if (category.startsWith("_")) continue

		if (title) list += `### ${category}\n`

		const categoryFunctions = functions
			.filter((i) => i.category === category)
			.sort((a, b) => a.name.localeCompare(b.name))

		for (const {
			name,
			docs,
			description,
			deprecated,
		} of categoryFunctions) {
			if (deprecated) continue

			const desc = description ? ` — ${description}` : ""
			list += `  - [\`${name}\`](${docs})${desc}\n`
		}
		list += "\n"
	}
	return list
}

export function replacer(
	code: string,
	value: string,
	key: string,
	insert: "head" | "tail" | "none" = "none"
) {
	const START = `<!--${key}_STARTS-->`
	const END = `<!--${key}_ENDS-->`
	const regex = new RegExp(`${START}[\\s\\S]*?${END}`, "im")

	const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`

	if (!code.match(regex)) {
		if (insert === "none") return code
		else if (insert === "head") return `${target}\n\n${code}`
		else return `${code}\n\n${target}`
	}

	return code.replace(regex, target)
}

export async function updatePackageREADME({
	packages,
	functions,
}: PackageIndexes) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	for (const { name, dir } of Object.values(packages)) {
		const readmePath = join(dir, "README.md")

		if (!fs.existsSync(readmePath)) continue

		const functionMD = stringifyFunctions(
			functions.filter((i) => i.package === name),
			false
		)
		let readme = await fs.readFile(readmePath, "utf-8")
		readme = replacer(readme, functionMD, "FUNCTIONS_LIST")

		await fs.writeFile(readmePath, `${readme.trim()}\n`, "utf-8")
	}
}

export async function updateIndexREADME({ functions }: PackageIndexes) {
	let readme = await fs.readFile("README.md", "utf-8")

	const functionsCount = functions.filter((i) => !i.internal).length

	readme = readme.replace(
		/img\.shields\.io\/badge\/-(.+?)%20functions/,
		`img.shields.io/badge/-${functionsCount}%20functions`
	)

	await fs.writeFile("README.md", `${readme.trim()}\n`, "utf-8")
}

export async function updateFunctionREADME(indexes: PackageIndexes) {
	const hasTypes = fs.existsSync(DIR_TYPES)

	if (!hasTypes)
		console.warn("No types dist found, run `npm run build:types` first.")

	for (const fn of indexes.functions) {
		const mdPath = `packages/${fn.package}/${fn.name}/index.md`

		const demo = `
<script>
    import Demo from "./_${fn.name}.svelte";
</script>

## Demo

<div id="demobox" >
    <Demo/>
</div>`
		if (!fs.existsSync(mdPath)) continue

		let mdFile = await fs.readFile(mdPath, "utf-8")

		const { content, data = {} } = matter(mdFile)

		data.category = fn.category || "Unknown"

		const docsPath = `${DIR_DOCS_ROUTE}/[...${getPackageDocIndex(
			fn.package
		)}]${fn.package}`

		if (fn.demo) {
			const demoContent = content.replace(
				"{$frontmatter.description}",
				`{$frontmatter.description}\n${demo}`
			)

			const demoReadme = `---\n${YAML.dump(
				data
			)}---\n\n${demoContent.trim()}`

			await fs.writeFile(
				join(docsPath, `${fn.name}.md`),
				`${demoReadme.trim()}\n`,
				"utf-8"
			)
		} else {
			mdFile = `---\n${YAML.dump(data)}---\n\n${content.trim()}`
			await fs.writeFile(
				join(docsPath, `${fn.name}.md`),
				`${mdFile.trim()}\n`,
				"utf-8"
			)
		}
	}
}

export async function updateCountBadge(indexes: PackageIndexes) {
	const functionsCount = indexes.functions.filter((i) => i.internal).length

	const url = `https://img.shields.io/badge/-${functionsCount}%20functions-13708a`

	const data = await $fetch(url, { responseType: "text" })

	await fs.writeFile(
		join(DIR_ROOT, "docs/static/badge-function-count.svg"),
		data,
		"utf-8"
	)
}

export async function updatePackageJSON(indexes: PackageIndexes) {
	const { version } = await fs.readJSON("package.json")

	for (const { name, description, author, submodules, iife } of packages) {
		const packageDir = join(DIR_SRC, name)

		const packageJSONPath = join(packageDir, "package.json")

		const packageJSON = await fs.readJSON(packageJSONPath)

		packageJSON.version = version

		packageJSON.description = description || packageJSON.description

		packageJSON.author =
			author || "Mohamed Nesredin<https://github.com/Mohamed-Kaizen>"

		packageJSON.bugs = {
			url: "https://github.com/Mohamed-Kaizen/svelteaction/issues",
		}

		packageJSON.homepage =
			name === "core"
				? "https://github.com/Mohamed-Kaizen/svelteaction#readme"
				: `https://github.com/Mohamed-Kaizen/svelteaction/tree/main/packages/${name}#readme`

		packageJSON.repository = {
			type: "git",
			url: "git+https://github.com/Mohamed-Kaizen/svelteaction.git",
			directory: `packages/${name}`,
		}

		packageJSON.main = "./index.cjs"

		packageJSON.types = "./index.d.ts"

		packageJSON.module = "./index.mjs"

		if (iife !== false) {
			packageJSON.unpkg = "./index.iife.min.js"
			packageJSON.jsdelivr = "./index.iife.min.js"
		}

		packageJSON.exports = {
			".": {
				import: "./index.mjs",
				require: "./index.cjs",
				types: "./index.d.ts",
			},
			"./*": "./*",
			...packageJSON.exports,
		}

		if (submodules) {
			indexes.functions
				.filter((i) => i.package === name)
				.forEach((i) => {
					packageJSON.exports[`./${i.name}`] = {
						types: `./${i.name}.d.ts`,
						import: `./${i.name}.mjs`,
						require: `./${i.name}.cjs`,
					}
				})
		}

		await fs.writeJSON(packageJSONPath, packageJSON, { spaces: 2 })
	}
}

async function fetchContributors(page = 1) {
	const additional = ["egoist"]

	const collaborators: string[] = []
	const data =
		(await $fetch<{ login: string }[]>(
			`https://api.github.com/repos/Mohamed-Kaizen/svelteaction/contributors?per_page=100&page=${page}`,
			{
				method: "get",
				headers: {
					"content-type": "application/json",
				},
			}
		)) || []
	collaborators.push(...data.map((i) => i.login))
	if (data.length === 100)
		collaborators.push(...(await fetchContributors(page + 1)))

	return Array.from(
		new Set([
			...collaborators.filter(
				(collaborator) =>
					![
						"renovate[bot]",
						"dependabot[bot]",
						"renovate-bot",
					].includes(collaborator)
			),
			...additional,
		])
	)
}

export async function updateContributors() {
	const collaborators = await fetchContributors()
	await fs.writeFile(
		"docs/src/routes/api/contributors.json",
		`${JSON.stringify(collaborators, null, 4)}\n`,
		"utf8"
	)
}
