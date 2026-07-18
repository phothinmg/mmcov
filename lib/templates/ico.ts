import fs from "node:fs";
import path from "node:path";
import type { Options } from "../types.js";
import { defaultIco } from "./default-ico.js";

/**
 * Returns the favicon data URI to embed in HTML pages.
 *
 * If `opts.favicon` is provided the file is read and base64-encoded; otherwise
 * the built-in default icon is returned.
 *
 * @param opts - Report options; only `favicon` is used.
 * @returns A data URI string (`data:image/x-icon;base64,...`) or the default icon string.
 */
function getIco(opts: Options): string {
	if (opts.favicon) {
		const icoPath = path.resolve(process.cwd(), opts.favicon);
		const buff = fs.readFileSync(icoPath, "base64");
		const ico = `data:image/x-icon;base64,${buff}`;
		return ico;
	} else {
		return defaultIco;
	}
}

export { getIco };
