import fs from "node:fs";
import path from "node:path";
import { minify } from "html-minifier-next";
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
		const html = await createFileHtml(file, opts);
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

export { generateLcovReport };
