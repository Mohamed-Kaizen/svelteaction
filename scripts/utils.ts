import fs from "fs-extra"
import { join } from "path"
import Git from "simple-git"

import { DIR_SRC } from "./meta/utils"
import { packages } from "./meta/packages"

import type { PackageIndexes } from "./meta/types"

export const git = Git()

export async function updateImport({ packages, functions }: PackageIndexes) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	for (const { name, dir, manualImport } of Object.values(packages)) {
		if (manualImport) continue

		let imports: string[] = []

		const uniqueImports: string[] = ["lists"]

		imports = functions
			.filter((i) => i.package === name)
			.map((f) => f.name)
			.sort()
			.map((name) => {
				if (uniqueImports.includes(name))
					return `export * as ${name} from "./${name}"`
				return `export * from './${name}'`
			})

		if (name === "core") {
			imports.push(
				"export * from './types'",
				"export * from '@svelteaction/shared'"
			)
		}

		await fs.writeFile(join(dir, "index.ts"), `${imports.join("\n")}\n`)
	}
}

export async function updatePackageJSON(indexes: PackageIndexes) {
	const { version } = await fs.readJSON("package.json")

	for (const { name, description, author, submodules } of packages) {
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
