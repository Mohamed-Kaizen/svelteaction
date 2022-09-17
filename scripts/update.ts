import { metadata } from "./meta/metadata"
import { updateImport, updatePackageJSON } from "./utils"

async function run() {
	await Promise.all([updateImport(metadata), updatePackageJSON(metadata)])
}

run()
