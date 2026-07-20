/** Aggregated count and percentage for a single coverage category (lines, functions, or branches). */
type TotalSubObject = {
	/** Total number of items found. */
	found: number;
	/** Number of items that were covered. */
	covered: number;
	/** Coverage percentage (0–100). */
	percentage: number;
};

/** Coverage data and rendered output information for a single source file. */
type FileObject = {
	file: {
		/** Relative path to the source file as recorded in the lcov report. */
		entryPath: string;
		/** Relative output path for the generated HTML page. */
		outputPath: string;
		/** Source lines of the file, optionally annotated with miss markers. */
		codeLines: string[];
		/** Shiki-highlighted HTML representation of the source code. */
		highlightedCode: string;
		/** Href used to link to this file's report page. */
		linkHref: string;
		/** Detected file extension (e.g. `"ts"`, `"js"`). */
		fileExtension?: string;
	};
	lines: {
		found: number;
		hit: number;
		percentage: number;
		details: {
			lineNumber: number;
			executionCount: number;
		}[];
	};
	functions: {
		found: number;
		hit: number;
		percentage: number;
		details: { name: string; lineNumber: number; executionCount: number }[];
	};
	branches: {
		found: number;
		hit: number;
		percentage: number;
		details: {
			lineNumber: number;
			blockNumber: number;
			branchNumber: number;
			taken: number;
		}[];
	};
};

/** Top-level report containing totals and per-file coverage data. */
type ReportObject = {
	total: {
		lines: TotalSubObject;
		functions: TotalSubObject;
		branches: TotalSubObject;
	};
	files: FileObject[];
};
type Jekyll = {
	name: "jekyll";
	siteDestDir?: string;
};
type FrameworkName = "jekyll" | "stand-alone";
/** Options passed to `generateLcovReport` to control report generation. */
type Options = {
	/** Path to the lcov.info file (relative to `process.cwd()`). */
	lcovPath: string;
	/** Source directories to include in the report (e.g. `["src", "lib"]`). */
	sourceDirs?: string[];
	/** Output directory for the generated HTML files. Defaults to `"coverage"`. */
	destDir?: string;
	/** Title displayed in the coverage report pages. */
	projectTitle?: string;
	/** Path to a custom favicon file. Falls back to the built-in icon when omitted. */
	favicon?: string;
	/**
	 * For MMDOCS Site.
	 *
	 * @default false
	 *
	 * @since v0.0.5
	 */
	mmdocs?: boolean;
};

export type { FileObject, Options, ReportObject };
