import { styleText } from "node:util";

function printHelp() {
	const help = `${styleText("bold", "mmcov cli")}
    ${styleText("bold", "Usage :")}
        mmcov                                 Run mmcov with config file.
        mmcov init                            Generate mmcov.config.{ts,js,mjs}
        mmcov --help                          Show help
        mmcov <entry> [options]               Generate report from entry lcov file.
    ${styleText("bold", "Options :")}
        --entry <path>                        Entry file (optional if provided as positional <entry>)
        --out <path>                          Output directory (optional)
        --source <dirs>                       Source directories to include in the report (optional)
        --favicon <path>                      Path to a custom favicon file. (optional)
        --project <name>                      Name of the project. (optional , example -> "my-project")
        --mmdoc[=true|false]                  The project is deploy with mmdoc jekyll theme(its active development)
        
    ${styleText("bold", "Examples :")}
        mmcov lcov.info                        Generate from .lcov file.
        mmcov --entry lcov.info -out coverage  Generate from .lcov file to /coverage directory
    `;
	console.log(help);
}

export { printHelp };
