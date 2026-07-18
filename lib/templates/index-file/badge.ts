import type { ReportObject } from "../../types.js";

function getOverAllPercentage(report: ReportObject) {
	const totalFound =
		report.total.lines.found +
		report.total.functions.found +
		report.total.branches.found;
	const totalCovered =
		report.total.lines.covered +
		report.total.functions.covered +
		report.total.branches.covered;
	const percent = (totalCovered / totalFound) * 100;
	let color = "";
	if (percent < 50) {
		// cspell:disable-next-line
		color = "palevioletred";
	} else if (percent >= 50 && percent < 80) {
		color = "orange";
	} else {
		color = "green";
	}
	return {
		percentage: percent.toFixed(2),
		color,
	};
}
function generateBadge(report: ReportObject) {
	const { percentage, color } = getOverAllPercentage(report);
	const rexPercentage = /\{\{\s*percentage\s*\}\}/gm;
	const rexColor = /\{\{\s*color\s*\}\}/gm;
	let markdown =
		"![mmcov](https://img.shields.io/badge/mmcov-{{percentage}}%25-{{color}}?style=flat&labelColor=%232c3e50)";
	let html = `<img alt="mmcov" width="115" height="20" src="https://img.shields.io/badge/mmcov-{{percentage}}%25-{{color}}?style=flat&labelColor=%232c3e50">
`;
	let overall = `<img alt="mmcov" width="115" height="20" src="https://img.shields.io/badge/overall-{{percentage}}%25-{{color}}?style=flat&labelColor=%232c3e50">
`;
	markdown = markdown
		.replace(rexPercentage, percentage)
		.replace(rexColor, color);
	html = html.replace(rexPercentage, percentage).replace(rexColor, color);
	overall = overall.replace(rexPercentage, percentage).replace(rexColor, color);
	return { markdown, html, overall };
}

export { generateBadge };
