import fs from "node:fs";
import path from "node:path";
import type { FileObject, Options, ReportObject } from "../types.js";
import { defaultLangs, shikiHL } from "./shiki.js";

class ReportGenerator {
	private _root: string;
	private _lcovPath: string;
	private _sources: string[];
	private _destDir: string;
	private _report: ReportObject;
	constructor({ lcovPath, sourceDirs, destDir }: Options) {
		this._root = process.cwd();
		this._lcovPath = path.resolve(this._root, lcovPath);
		this._sources = sourceDirs;
		this._destDir = destDir ?? "docs/coverage";
		this._report = {
			total: {
				lines: {
					found: 0,
					covered: 0,
					percentage: 100,
				},
				functions: {
					found: 0,
					covered: 0,
					percentage: 100,
				},
				branches: {
					found: 0,
					covered: 0,
					percentage: 100,
				},
			},
			files: [],
		};
	}
	private getOutInfo(entryPath: string) {
		let ext = path.extname(entryPath).slice(1);
		if (!defaultLangs.includes(ext)) {
			ext = "text";
		}
		let parts = entryPath.split("/");
		const fname = `${parts[parts.length - 1]?.split(".").join("_")}`;
		parts = parts.slice(0, -1);
		const file_name = `${parts.join("_")}_${fname}.html`;
		const outputPath = path.join(this._destDir, file_name);
		return { ext, outputPath, linkText: entryPath, linkHref: file_name };
	}
	private readLcov() {
		const content = fs.readFileSync(this._lcovPath, "utf8");
		const source_paths = this._sources.map(
			(source) => `SF:${source.replace(/^\.\//, "")}/`,
		);
		let records = content
			.split("end_of_record")
			.map((r) => r.trim())
			.filter(Boolean);
		// remove TN:
		records = records.map((rec) => {
			if (/^TN:/.test(rec)) {
				return rec.replace(/TN:/, "").trim();
			} else {
				return rec.trim();
			}
		});
		// filter records from source directories
		records = records.filter((rec) => {
			for (const path of source_paths) {
				if (rec.startsWith(path)) {
					return rec;
				}
			}
		});
		return records;
	}
	private generateLcovSingleFile(input: string) {
		const lines = input.split("\n");
		const result: FileObject = {
			file: {
				entryPath: "",
				outputPath: "",
				codeLines: [],
				highlightedCode: "",
				linkHref: "",
			},
			lines: {
				found: 0,
				hit: 0,
				percentage: 100,
				details: [],
			},
			functions: {
				found: 0,
				hit: 0,
				percentage: 100,
				details: [],
			},
			branches: {
				found: 0,
				hit: 0,
				percentage: 100,
				details: [],
			},
		};
		for (const line of lines) {
			const trimmed = line.trim();
			// file name
			if (trimmed.startsWith("SF:")) {
				// SF:filePath
				const filePath = trimmed.slice(3);
				result.file.entryPath = filePath;
				const content = fs.readFileSync(
					path.resolve(process.cwd(), filePath),
					"utf8",
				);
				result.file.codeLines = content.split("\n");
				const outs = this.getOutInfo(filePath);
				result.file.outputPath = outs.outputPath;
				result.file.fileExtension = outs.ext;
				result.file.linkHref = outs.linkHref;
			}
			// 1. functions -> details
			else if (trimmed.startsWith("FN:")) {
				// FN:lineNumber,functionName
				const parts = trimmed.slice(3).split(",");
				const lineNumber = Number.parseInt(parts[0] || "0", 10);
				const name = parts.slice(1).join(",");
				result.functions.details.push({
					name,
					lineNumber,
					executionCount: 0,
				});
			}
			// 1. functions -> details -> executionCount
			else if (trimmed.startsWith("FNDA:")) {
				// FNDA:executionCount,functionName
				const parts = trimmed.substring(5).split(",");
				const executionCount = Number.parseInt(parts[0] || "0", 10);
				const functionName = parts.slice(1).join(",");
				const func = result.functions.details.find(
					(f) => f.name === functionName,
				);
				if (func) {
					func.executionCount = executionCount;
				}
			}
			// 1.1 functions -> found
			else if (trimmed.startsWith("FNF:")) {
				// FNF:foundCount
				const found = Number.parseInt(trimmed.slice(4), 10);
				result.functions.found = found;
				this._report.total.functions.found += found;
			}
			// 1.2 functions -> hit
			else if (trimmed.startsWith("FNH:")) {
				// FNH:hitCount
				const hit = Number.parseInt(trimmed.slice(4), 10);
				result.functions.hit = hit;
				this._report.total.functions.covered += hit;
			}
			// 2. lines -> details
			else if (trimmed.startsWith("DA:")) {
				// DA:lineNumber,numberOfHitForThisLine
				const parts = trimmed.substring(3).split(",");
				const lineNumber = Number.parseInt(parts[0] || "0", 10);
				const executionCount = Number.parseInt(parts[1] || "0", 10);
				result.lines.details.push({
					lineNumber,
					executionCount,
				});
			}
			// 2.1 lines -> found
			else if (trimmed.startsWith("LF:")) {
				// LF:numberFoundLines
				const found = Number.parseInt(trimmed.slice(3), 10);
				result.lines.found = found;
				this._report.total.lines.found += found;
			}
			// 2.2 lines -> hit
			else if (trimmed.startsWith("LH:")) {
				// LH:hitCount
				const hit = Number.parseInt(trimmed.slice(3), 10);
				result.lines.hit = hit;
				this._report.total.lines.covered += hit;
			}
			// 3. branches -> details
			else if (trimmed.startsWith("BRDA:")) {
				// BRDA:lineNumber,lockNumber,branchNumber,taken
				const parts = trimmed.substring(5).split(",");
				const lineNumber = Number.parseInt(parts[0] || "0", 10);
				const blockNumber = Number.parseInt(parts[1] || "0", 10);
				const branchNumber = Number.parseInt(parts[2] || "0", 10);
				const taken =
					parts[3] === "-" ? 0 : Number.parseInt(parts[3] || "0", 10);
				result.branches.details.push({
					lineNumber,
					blockNumber,
					branchNumber,
					taken,
				});
			}
			// 3.1 branches -> found
			else if (trimmed.startsWith("BRF:")) {
				// BRF:foundCount
				const found = Number.parseInt(trimmed.slice(4), 10);
				result.branches.found = found;
				this._report.total.branches.found += found;
			}
			// 3.2 branches -> hit
			else if (trimmed.startsWith("BRH:")) {
				// BRH:hitCount
				const hit = Number.parseInt(trimmed.slice(4), 10);
				result.branches.hit = hit;
				this._report.total.branches.covered += hit;
			}
		} // lines loop end
		// some comment lines and blank line become found line
		for (let i = 0; i < result.lines.details.length; i++) {
			const txt = result.file.codeLines[i];
			const detail = result.lines.details[i];
			if (txt !== undefined && detail) {
				if (txt === "") {
					(
						result.lines.details[i] as {
							lineNumber: number;
							executionCount: number;
						}
					).executionCount += 1;
				} else if (/^\s*\/\*\*\s*$/.test(txt)) {
					(
						result.lines.details[i] as {
							lineNumber: number;
							executionCount: number;
						}
					).executionCount += 1;
				} else if (detail.executionCount === 0 && /^\s*\/\/\s+.*$/.test(txt)) {
					(
						result.lines.details[i] as {
							lineNumber: number;
							executionCount: number;
						}
					).executionCount += 1;
				}
			}
		} // comment lines and blank line loop end
		// calculate file percentages
		if (result.lines.found > 0) {
			result.lines.percentage = (result.lines.hit / result.lines.found) * 100;
		}
		if (result.functions.found > 0) {
			result.functions.percentage =
				(result.functions.hit / result.functions.found) * 100;
		}
		if (result.branches.found > 0) {
			result.branches.percentage =
				(result.branches.hit / result.branches.found) * 100;
		}
		// calculate file percentages end
		// create code miss lines
		for (let i = 0; i < result.lines.details.length; i++) {
			const detail = result.lines.details[i];
			const missLineTxt = " // [!code highlight]";
			if (result.file.codeLines[i] !== undefined && detail) {
				result.file.codeLines[i] =
					detail.executionCount === 0
						? `${result.file.codeLines[i]}${missLineTxt}`
						: (result.file.codeLines[i] as string);
			}
		} // create code miss lines end
		// highlight code
		if (result.file.fileExtension) {
			const code = result.file.codeLines.join("\n");
			result.file.highlightedCode = shikiHL(code, result.file.fileExtension);
		}
		this._report.files.push(result);
	}
	generate() {
		const records = this.readLcov();
		records.forEach((record) => this.generateLcovSingleFile(record));
		if (this._report.total.lines.found > 0) {
			this._report.total.lines.percentage =
				(this._report.total.lines.covered / this._report.total.lines.found) *
				100;
		}
		if (this._report.total.functions.found > 0) {
			this._report.total.functions.percentage =
				(this._report.total.functions.covered /
					this._report.total.functions.found) *
				100;
		}
		if (this._report.total.branches.found > 0) {
			this._report.total.branches.percentage =
				(this._report.total.branches.covered /
					this._report.total.branches.found) *
				100;
		}
		return this._report;
	}
}

export { ReportGenerator };
