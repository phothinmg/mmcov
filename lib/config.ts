import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { Options } from "./types.js";

export type Config = {
	lcovPath: string;
	sourceDirs: string[];
	destDir: string;
	projectTitle: string;
	favicon: string;
	mmdocs: boolean;
};

/**
 * Retrieves the path to the configuration file.
 * Searches for files with names "mmcov.config.ts", "mmcov.config.js",
 * and "mmcov.config.mjs" in the current working directory.
 * Returns the first matching file path found, or null if no file is found.
 * @returns The path to the configuration file, or null if not found.
 */
const getConfigFilePath = (): string | null => {
	const fileNames = ["mmcov.config.ts", "mmcov.config.js", "mmcov.config.mjs"];
	let configFile: string | null = null;
	for (const file of fileNames) {
		const _file = path.resolve(process.cwd(), file);
		if (fs.existsSync(_file)) {
			configFile = _file;
			break;
		}
	}

	return configFile;
};
const generateConfig = (opts: Options) => {
	const result = {} as Config;
	result.lcovPath = opts.lcovPath;
	result.destDir = opts.destDir ?? "coverage";
	result.sourceDirs = opts.sourceDirs ?? [];
	result.projectTitle = opts.projectTitle ?? "Coverage Report";
	result.favicon = opts.favicon ?? "default";
	result.mmdocs = opts.mmdocs ?? false;
	return result;
};
const getOptionsFromConfigFile = async () => {
	const configPath = getConfigFilePath();
	if (configPath) {
		const _default: { default: Options } = await import(configPath as string);
		const config = _default.default;
		return generateConfig(config);
	} else {
		return null;
	}
};

const getConfigOptions = async (opts?: Options) => {
	const config = await getOptionsFromConfigFile();
	if (opts) {
		console.info(`[mmcov info] : Start generate with given options.`);
		return generateConfig(opts);
	} else if (config !== null) {
		console.info(
			`[mmcov info] : Start generate with options from config file.`,
		);
		return config;
	} else {
		console.error(`[mmcov error] : Require options or config file.`);
		process.exit(1);
	}
};

export { getConfigOptions };
