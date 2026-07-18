const getReportClass = (input: number) => {
  return input >= 80 ? "high" : input >= 50 && input < 80 ? "medium" : "low";
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export { getReportClass, escapeHtml };
