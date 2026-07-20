const tsText = `import type { Options } from "mmcov";

const config: Options = {
  /*
    Path to the lcov.info file (relative to process.cwd()).
    Required
  */
  lcovPath: "lcov.info",
  /*
    Output directory for the generated HTML files. Defaults to "coverage".
    Optional (Uncomment the following line to edit).
  */
  //destDir:"coverage",
  /*
    Source directories to include in the report (e.g. ["src", "lib"]).Defaults to "[]".
    Optional (Uncomment the following line to edit).
  */
  //sourceDirs: [],
  /*
    Title displayed in the coverage report pages.Defaults to "Coverage Report".
    Optional (Uncomment the following line to edit).
  */
  //projectTitle:"Coverage Report",
  /*
    Path to a custom favicon file. Falls back to the built-in icon when omitted. 
    Optional (Uncomment the following line to edit).
  */
  //favicon: undefined,
  /*
    The project is deploy with mmdoc jekyll theme(its active development) .
    Optional (Uncomment the following line to edit).
  */
  //mmdocs: false,
};

export default config;
`;

const jsText = `/** @type {import("mmcov").Options} */
const config = {
  /*
    Path to the lcov.info file (relative to process.cwd()).
    Required
  */
  lcovPath: "lcov.info",
  /*
    Output directory for the generated HTML files. Defaults to "coverage".
    Optional (Uncomment the following line to edit).
  */
  //destDir:"coverage",
  /*
    Source directories to include in the report (e.g. ["src", "lib"]).Defaults to "[]".
    Optional (Uncomment the following line to edit).
  */
  //sourceDirs: [],
  /*
    Title displayed in the coverage report pages.Defaults to "Coverage Report".
    Optional (Uncomment the following line to edit).
  */
  //projectTitle:"Coverage Report",
  /*
    Path to a custom favicon file. Falls back to the built-in icon when omitted. 
    Optional (Uncomment the following line to edit).
  */
  //favicon: undefined,
  /*
    The project is deploy with mmdoc jekyll theme(its active development) .
    Optional (Uncomment the following line to edit).
  */
  //mmdocs: false,
};

export default config;
`;

export { jsText, tsText };
