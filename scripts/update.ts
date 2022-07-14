import fs from "fs-extra"
import { metadata } from "./meta/metadata"
import {
	updateContributors,
	updateCountBadge,
	updateFunctionREADME,
	updateImport,
	updateIndexREADME,
	updatePackageJSON,
	updatePackageREADME,
} from "./utils"

async function run() {
	await Promise.all([
		updateImport(metadata),
		updatePackageREADME(metadata),
		updateIndexREADME(metadata),
		updateFunctionREADME(metadata),
		updatePackageJSON(metadata),
		updateCountBadge(metadata),
		updateContributors(),
	])

	await fs.copy(
		"./CONTRIBUTING.md",
		"./docs/src/routes/contributing@kit-docs.md"
	)
}

run()
