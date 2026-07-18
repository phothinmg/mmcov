/**
 * Maps a coverage percentage to a CSS class name.
 *
 * @param input - Coverage percentage (0–100).
 * @returns `"high"` for ≥ 80 %, `"medium"` for 50–79 %, or `"low"` for < 50 %.
 */
const getReportClass = (input: number) => {
	return input >= 80 ? "high" : input >= 50 && input < 80 ? "medium" : "low";
};

/**
 * Escapes special HTML characters in a string to prevent XSS when inserting
 * arbitrary content into HTML templates.
 *
 * @param value - The raw string to escape.
 * @returns The HTML-escaped string.
 */
function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export { escapeHtml, getReportClass };
