import { createHighlighter } from "shiki";
import { transformerNotationHighlight } from "@shikijs/transformers";

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
function shikiHL(code: string, lang: any) {
  return highlighter.codeToHtml(code, {
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
}

export { defaultLangs, shikiHL };
