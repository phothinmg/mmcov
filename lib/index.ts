import fs from "node:fs";
import path from "node:path";
import { minify } from "html-minifier-next";
import { ReportGenerator } from "./generator/index.js";
import { createFileHtml, createIndexHtml } from "./templates/index.js";
import type { Options } from "./types.js";

async function createFilePage(opts: Options) {
	const report = new ReportGenerator(opts);
	const lcov = report.generate();
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
async function createIndexPage(opts: Options) {
	const report = new ReportGenerator(opts);
	const lcov = report.generate();
	const fileName = opts.destDir
		? `${opts.destDir}/index.html`
		: "docs/coverage/index.html";
	const filePath = path.resolve(process.cwd(), fileName);
	const html = createIndexHtml(lcov, opts);
	const minifiedHtml = await minify(html, {
		minifyCSS: true,
		collapseWhitespace: true,
		removeComments: true,
		minifyJS: true,
	});
	await fs.promises.writeFile(filePath, minifiedHtml);
}

async function generateLcovReport(opts: Options) {
	try {
		await createFilePage(opts);
		await createIndexPage(opts);
	} catch (err: any) {
		console.log(err);
	}
}

export { generateLcovReport };
