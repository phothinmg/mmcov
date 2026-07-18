type TotalSubObject = {
	found: number;
	covered: number;
	percentage: number;
};

type FileObject = {
	file: {
		entryPath: string;
		outputPath: string;
		codeLines: string[];
		highlightedCode: string;
		linkHref: string;
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

type ReportObject = {
	total: {
		lines: TotalSubObject;
		functions: TotalSubObject;
		branches: TotalSubObject;
	};
	files: FileObject[];
};

type Options = {
	lcovPath: string;
	sourceDirs: string[];
	destDir?: string;
	projectTitle?: string;
	favicon?: string;
};

export type { FileObject, Options, ReportObject };
