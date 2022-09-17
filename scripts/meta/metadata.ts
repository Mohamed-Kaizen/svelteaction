import _metadata, {
	functions as _functions,
	packages as _packages,
} from "./index.json"

import type { PackageIndexes } from "./types"

export const metadata = _metadata as PackageIndexes
export const functions = _functions as PackageIndexes["functions"]
export const packages = _packages as PackageIndexes["packages"]
