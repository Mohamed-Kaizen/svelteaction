import { execSync } from "child_process"
import consola from "consola"
import path from "path"

import { version } from "../package.json"
import { packages } from "./meta/packages"

execSync("npm run build", { stdio: "inherit" })

let command = "npm publish --access public"

if (version.includes("beta")) command += " --tag beta"

for (const { name } of packages) {
	execSync(command, {
		stdio: "inherit",
		cwd: path.join("packages", name, "dist"),
	})
	consola.success(`Published @svelteaction/${name}`)
}
