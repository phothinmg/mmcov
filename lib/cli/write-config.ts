import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";
import { jsText, tsText } from "./config-text.js";

async function getPackageType() {
	const pkgPath = path.resolve(process.cwd(), "package.json");
	const _pkg = await fs.promises.readFile(pkgPath, "utf8");
	const pkg = JSON.parse(_pkg);
	return pkg.type === "module" ? "esm" : "commonjs";
}
async function writeConfigFile() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	const is_ts = await rl.question("Is TypeScript Project(y/n) : ");
	const isTs = !!(is_ts === "y" || is_ts === "Y" || is_ts === "");
	rl.close();
	let configFile = "";
	let str = "";
	if (isTs) {
		configFile = "susee.config.ts";
		str = tsText;
	} else {
		str = jsText;
		const pkgType = await getPackageType();
		switch (pkgType) {
			case "commonjs":
				configFile = "susee.config.mjs";
				break;
			case "esm":
				configFile = "susee.config.js";
				break;
		}
	}
	const configFilePath = path.resolve(process.cwd(), configFile);
	if (fs.existsSync(configFilePath)) await fs.promises.unlink(configFilePath);
	await fs.promises.writeFile(configFilePath, str);
	console.info(
		`Done! Susee config file ${configFile} is created at project root`,
	);
}

export { writeConfigFile };
