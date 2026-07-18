import { shikiHL } from "../generator/shiki.js";
import type { FileObject, Options, ReportObject } from "../types.js";
import { fileHtml } from "./file/file-html.js";
import { fileCss } from "./file/fileCss.js";
import { getReportClass } from "./helpers.js";
import { getIco } from "./ico.js";
import { generateBadge } from "./index-file/badge.js";
import { copyBtn } from "./index-file/copy-btn.js";
import { indexCss } from "./index-file/index-css.js";
import { indexHtml } from "./index-file/index-html.js";
import { createFilesRows } from "./index-file/rows-html.js";
import { mainCss } from "./main-css.js";
import { rex } from "./rex.js";
import { themeInit } from "./theme-init.js";
import { themeScript } from "./theme-script.js";

const getFileTitle = (fileObj: FileObject, opts: Options) => {
	const mainTitle = opts.projectTitle ?? "Coverage Report";
	return `${mainTitle}-${fileObj.file.entryPath}`;
};
function capitalizeSentence(sentence: string) {
	return sentence
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
const getReportTitle = (opts: Options) => {
	let title = "Coverage Report";
	if (opts.projectTitle) {
		title = opts.projectTitle;
	}
	return title;
};
const getProjectName = (opts: Options) => {
	let title = "Coverage Report";
	if (opts.projectTitle) {
		const capitalize = capitalizeSentence(opts.projectTitle);
		title = `${capitalize} Coverage Report`;
	}
	return title;
};
/**
 *
 * @param fileObj
 * @param opts
 * @returns
 */
function createFileHtml(fileObj: FileObject, opts: Options) {
	let html = fileHtml;
	// main documents attrs
	html = html.replace(rex.mainCss, mainCss);
	html = html.replace(rex.themeInit, themeInit);
	const ico = getIco(opts);
	html = html.replace(rex.favicon, ico);
	html = html.replace(rex.themeScript, themeScript);
	// File Template -> Total 13 items
	// 1
	html = html.replace(rex.fileCss, fileCss);
	// 2
	const fileTitle = getFileTitle(fileObj, opts);
	html = html.replace(rex.fileTitle, fileTitle);
	// 3
	html = html.replace(rex.fileName, fileObj.file.entryPath);
	// Result Div ->
	// 4 lines results -> 4 to 6
	const linesClass = getReportClass(fileObj.lines.percentage);
	html = html.replace(rex.linesClass, linesClass);
	// 5
	const linesPercentage = `${fileObj.lines.percentage.toFixed(2)}%`;
	html = html.replace(rex.linesPercentage, linesPercentage);
	// 6
	const linesInfo = `(${fileObj.lines.hit}/${fileObj.lines.found})`;
	html = html.replace(rex.linesInfo, linesInfo);
	// 7 functions results -> 7 to 9
	const functionsClass = getReportClass(fileObj.functions.percentage);
	html = html.replace(rex.functionsClass, functionsClass);
	// 8
	const functionsPercentage = `${fileObj.functions.percentage.toFixed(2)}%`;
	html = html.replace(rex.functionsPercentage, functionsPercentage);
	// 9
	const functionsInfo = `(${fileObj.functions.hit}/${fileObj.functions.found})`;
	html = html.replace(rex.functionsInfo, functionsInfo);
	// 10 branches results -> 10 to 12
	const branchesClass = getReportClass(fileObj.branches.percentage);
	html = html.replace(rex.branchesClass, branchesClass);
	// 11
	const branchesPercentage = `${fileObj.branches.percentage.toFixed(2)}%`;
	html = html.replace(rex.branchesPercentage, branchesPercentage);
	const branchesInfo = `(${fileObj.branches.hit}/${fileObj.branches.found})`;
	// 12
	html = html.replace(rex.branchesInfo, branchesInfo);
	// 13
	html = html.replace(rex.shiki, fileObj.file.highlightedCode);

	return html;
}

function createIndexHtml(obj: ReportObject, opts: Options) {
	let html = indexHtml;
	// main documents attrs
	html = html.replace(rex.mainCss, mainCss);
	html = html.replace(rex.themeInit, themeInit);
	const ico = getIco(opts);
	html = html.replace(rex.favicon, ico);
	html = html.replace(rex.themeScript, themeScript);
	html = html.replace(rex.copyBtn, copyBtn);
	// index html
	const badge = generateBadge(obj);
	html = html.replace(rex.badge, badge.overall);
	html = html.replace(rex.mdBadge, shikiHL(badge.markdown, "md"));
	html = html.replace(rex.htmlBadge, shikiHL(badge.html, "html"));
	html = html.replace(rex.indexCss, indexCss);
	const projectTitle = getReportTitle(opts);
	html = html.replace(rex.projectTitle, projectTitle);
	const projectName = getProjectName(opts);
	html = html.replace(rex.projectName, projectName);
	// --
	const totalLineClass = getReportClass(obj.total.lines.percentage);
	html = html.replace(rex.totalLinesClass, totalLineClass);
	html = html.replace(
		rex.totalLinesPercentage,
		`${obj.total.lines.percentage.toFixed(2)}%`,
	);
	html = html.replace(
		rex.totalLinesInfo,
		`(${obj.total.lines.covered}/${obj.total.lines.found})`,
	);
	// --
	const totalFunctionClass = getReportClass(obj.total.functions.percentage);
	html = html.replace(rex.totalFunctionsClass, totalFunctionClass);
	html = html.replace(
		rex.totalFunctionsPercentage,
		`${obj.total.functions.percentage.toFixed(2)}%`,
	);
	html = html.replace(
		rex.totalFunctionsInfo,
		`(${obj.total.functions.covered}/${obj.total.functions.found})`,
	);
	// --
	const totalBranchClass = getReportClass(obj.total.branches.percentage);
	html = html.replace(rex.totalBranchesClass, totalBranchClass);
	html = html.replace(
		rex.totalBranchesPercentage,
		`${obj.total.branches.percentage.toFixed(2)}%`,
	);
	html = html.replace(
		rex.totalBranchesInfo,
		`(${obj.total.branches.covered}/${obj.total.branches.found})`,
	);
	// --
	const rows = createFilesRows(obj);
	html = html.replace(rex.tableRows, rows);
	return html;
}

export { createFileHtml, createIndexHtml };
