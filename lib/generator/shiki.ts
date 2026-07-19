import { transformerNotationHighlight } from "@shikijs/transformers";
import { createHighlighter } from "shiki";

const defaultLangs = [
	"ts",
	"js",
	"tsx",
	"jsx",
	"json",
	"cts",
	"mjs",
	"cts",
	"mts",
];

/**
 * Syntax-highlights `code` using Shiki with the `light-plus` / `dark-plus`
 * dual-theme configuration and the notation-highlight transformer.
 *
 * @param code - The source code string to highlight.
 * @param lang - The language identifier (e.g. `"ts"`, `"js"`).
 * @returns An HTML string containing the highlighted code block.
 */
async function shikiHL(code: string, lang: any) {
	const highlighter = await createHighlighter({
		langs: [
			"ts",
			"js",
			"tsx",
			"jsx",
			"json",
			"text",
			"cts",
			"mjs",
			"cts",
			"mts",
			"html",
			"md",
		],
		themes: ["light-plus", "dark-plus"],
	});
	const result = highlighter.codeToHtml(code, {
		lang: lang,
		themes: {
			light: "light-plus",
			dark: "dark-plus",
		},
		transformers: [
			transformerNotationHighlight({
				matchAlgorithm: "v3",
			}),
		],
	});
	highlighter.dispose();
	return result;
}

export { defaultLangs, shikiHL };
