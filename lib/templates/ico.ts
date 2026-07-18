import fs from "node:fs";
import path from "node:path";
import { defaultIco } from "./default-ico.js";
import type { Options } from "../types.js";

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
