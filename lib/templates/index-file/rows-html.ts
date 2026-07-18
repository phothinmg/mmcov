import type { FileObject, ReportObject } from "../../types.js";
import { getReportClass } from "../helpers.js";

const indexRegexp = {
  linkHref: /\{\{\s*linkHref\s*\}\}/gm,
  linkText: /\{\{\s*linkText\s*\}\}/gm,
  fileLineClass: /\{\{\s*fileLineClass\s*\}\}/gm,
  fileLinePercentage: /\{\{\s*fileLinePercentage\s*\}\}/gm,
  fileLineInfo: /\{\{\s*fileLineInfo\s*\}\}/gm,
  fileFunctionClass: /\{\{\s*fileFunctionClass\s*\}\}/gm,
  fileFunctionPercentage: /\{\{\s*fileFunctionPercentage\s*\}\}/gm,
  fileFunctionInfo: /\{\{\s*fileFunctionInfo\s*\}\}/gm,
  fileBranchClass: /\{\{\s*fileBranchClass\s*\}\}/gm,
  fileBranchPercentage: /\{\{\s*fileBranchPercentage\s*\}\}/gm,
  fileBranchInfo: /\{\{\s*fileBranchInfo\s*\}\}/gm,
};

const rowHtml = `<tr>
<td><a href="{{ linkHref }}">{{ linkText }}</a></td>
<td class="{{ fileLineClass }}">{{ fileLinePercentage }}</td>
<td>{{ fileLineInfo }}</td>
<td class="{{ fileFunctionClass }}">{{ fileFunctionPercentage }}</td>
<td>{{ fileFunctionInfo }}</td>
<td class="{{ fileBranchClass }}">{{ fileBranchPercentage }}</td>
<td>{{ fileBranchInfo }}</td>
</tr>`;

const fileRows = (fileObj: FileObject) => {
  let html = rowHtml;
  html = html.replace(indexRegexp.linkText, fileObj.file.entryPath);
  html = html.replace(indexRegexp.linkHref, fileObj.file.linkHref);
  const fileLineClass = getReportClass(fileObj.lines.percentage);
  html = html.replace(indexRegexp.fileLineClass, fileLineClass);
  html = html.replace(
    indexRegexp.fileLinePercentage,
    `${fileObj.lines.percentage.toFixed(2)}%`,
  );
  html = html.replace(
    indexRegexp.fileLineInfo,
    `${fileObj.lines.hit}/${fileObj.lines.found}`,
  );
  const fileFunctionClass = getReportClass(fileObj.functions.percentage);
  html = html.replace(indexRegexp.fileFunctionClass, fileFunctionClass);
  html = html.replace(
    indexRegexp.fileFunctionPercentage,
    `${fileObj.functions.percentage.toFixed(2)}%`,
  );
  html = html.replace(
    indexRegexp.fileFunctionInfo,
    `${fileObj.functions.hit}/${fileObj.functions.found}`,
  );
  const fileBranchClass = getReportClass(fileObj.branches.percentage);
  html = html.replace(indexRegexp.fileBranchClass, fileBranchClass);
  html = html.replace(
    indexRegexp.fileBranchPercentage,
    `${fileObj.branches.percentage.toFixed(2)}%`,
  );
  html = html.replace(
    indexRegexp.fileBranchInfo,
    `${fileObj.branches.hit}/${fileObj.branches.found}`,
  );
  return html;
};

function createFilesRows(report: ReportObject) {
  return report.files.map(fileRows).join("\n");
}

export { createFilesRows };
