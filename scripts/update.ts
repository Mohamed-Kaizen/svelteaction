import fs from "fs-extra"
import { metadata } from "./meta/metadata"
import {
	updateContributors,
	updateCountBadge,
	updateFunctionREADME,
	updateFunctionsMD,
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
		updateFunctionsMD(metadata),
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
