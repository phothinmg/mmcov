import fs from "node:fs";
import path from "node:path";
import { minify } from "html-minifier-next";
import { printHelp } from "./cli/print-help.js";
import { writeConfigFile } from "./cli/write-config.js";
import { type Config, getConfigOptions } from "./config.js";
import { ReportGenerator } from "./generator/index.js";
import { createFileHtml, createIndexHtml } from "./templates/index.js";
import type { Options } from "./types.js";

/**
 * Generates and writes an individual HTML coverage page for every source file
 * listed in the lcov report.
 *
 * @param opts - Report generation options.
 */
async function createFilePage(opts: Config): Promise<void> {
	const report = new ReportGenerator(opts);
	const lcov = await report.generate();
	for (const file of lcov.files) {
		const filePath = path.resolve(process.cwd(), file.file.outputPath);
		const html = createFileHtml(file, opts);
		if (!fs.existsSync(path.dirname(filePath))) {
			await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
		}
		const minifiedHtml = await minify(html, {
			minifyCSS: true,
			collapseWhitespace: true,
			removeComments: true,
			minifyJS: true,
		});
		await fs.promises.writeFile(filePath, minifiedHtml);
	}
}
/**
 * Generates and writes the `index.html` summary page for the coverage report.
 *
 * @param opts - Report generation options.
 */
async function createIndexPage(options: Config): Promise<void> {
	const report = new ReportGenerator(options);
	const lcov = await report.generate();
	const home = await createIndexHtml(lcov, options);
	const filePath = path.resolve(process.cwd(), home.fileName);
	const minifiedHtml = await minify(home.html, {
		minifyCSS: true,
		collapseWhitespace: true,
		removeComments: true,
		minifyJS: true,
	});
	await fs.promises.writeFile(filePath, minifiedHtml);
}

/**
 * Generates a full HTML coverage report from an lcov data file.
 *
 * Creates one HTML page per source file and an `index.html` summary page,
 * writing all output to the directory specified by `opts.destDir`.
 *
 * @param opts - Report generation options.
 */
async function generateLcovReport(options?: Options): Promise<void> {
	const opts = await getConfigOptions(options);
	try {
		await createFilePage(opts);
		await createIndexPage(opts);
	} catch (err: any) {
		console.log(err);
	}
}

function fail(message: string) {
	console.error(`[mmcov error] : ${message}`);
	process.exit(1);
}
/**
 * This function is the main entry point of the mmcov CLI tool.
 *
 * It parses command line arguments, configures the report generation options,
 * and then calls the `generateLcovReport` function to generate and write the coverage report.
 *
 * @param args - Command line arguments passed to the mmcov CLI tool.
 */
async function mmcov(): Promise<void> {
	const opts = {} as Options;
	const argvs = process.argv.slice(2);
	if (argvs.length === 0) {
		await generateLcovReport();
	} else if (argvs.length === 1) {
		const arg1 = argvs[0] as string;
		if (!arg1.startsWith("-")) {
			opts.lcovPath = arg1;
			const config = await getConfigOptions(opts);
			await generateLcovReport(config);
		} else if (arg1 === "--help") {
			printHelp();
		} else if (arg1 === "init") {
			await writeConfigFile();
		} else {
			fail(
				`For only one cli option must be lcov file or "--help". "mmcov --help" for detail.`,
			);
		}
	} else if (argvs.length > 1) {
		let i = 0;
		while (i < argvs.length) {
			const arg = argvs[i] as string;
			if (i === 0 && !arg.startsWith("-")) {
				opts.lcovPath = arg;
				i += 1;
			} else {
				switch (arg) {
					case "--entry":
						if ((argvs[i + 1] as string).startsWith("-")) {
							fail(
								`Invalid cli usage "${arg} ${argvs[i + 1]}". "mmcov --help" for detail.`,
							);
						} else {
							opts.lcovPath = argvs[i + 1] as string;
							i += 2;
						}
						break;
					case "--out":
						if ((argvs[i + 1] as string).startsWith("-")) {
							fail(
								`Invalid cli usage "${arg} ${argvs[i + 1]}". "mmcov --help" for detail.`,
							);
						} else {
							opts.destDir = argvs[i + 1] as string;
							i += 2;
						}
						break;
					case "--source":
						if ((argvs[i + 1] as string).startsWith("-")) {
							fail(
								`Invalid cli usage "${arg} ${argvs[i + 1]}". "mmcov --help" for detail.`,
							);
						} else {
							opts.sourceDirs = (argvs[i + 1] as string).split(",");
							i += 2;
						}
						break;
					case "--favicon":
						if ((argvs[i + 1] as string).startsWith("-")) {
							fail(`Invalid cli usage "${arg} ${argvs[i + 1]}"`);
						} else {
							opts.favicon = argvs[i + 1] as string;
							i += 2;
						}
						break;
					case "--project":
						if ((argvs[i + 1] as string).startsWith("-")) {
							fail(
								`Invalid cli usage "${arg} ${argvs[i + 1]}". "mmcov --help" for detail.`,
							);
						} else {
							opts.projectTitle = (argvs[i + 1] as string).split("-").join(" ");
							i += 2;
						}
						break;
					case "--mmdocs":
						if (
							(argvs[i + 1] &&
								argvs[i + 1] !== "" &&
								(argvs[i + 1] as string).startsWith("-")) ||
							argvs[i + 1] === "" ||
							argvs[i + 1] === undefined
						) {
							opts.mmdocs = true;
							i += 1;
						} else {
							fail(
								`Invalid cli usage "${arg} ${argvs[i + 1]}". "mmcov --help" for detail.`,
							);
						}
						break;
					default:
						i += 1;
						break;
				}
			}
		}
		const config = await getConfigOptions(opts);
		await generateLcovReport(config);
	}
}

export type { Options };
export { generateLcovReport, mmcov };
