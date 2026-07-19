# mmcov

## Overview

A technical tool designed to transform raw lcov coverage data into human-readable, static HTML reports.

### Key Technologies

TypeScript, Node.js, Shiki (Syntax Highlighting), html-minifier-next, Biome (Linting/Formatting), susee (Build Tool).

## Getting Started

### Installation

`mmcov` is distributed as a Node.js package. You can install it using your preferred package manager. The package provides both ESM and CommonJS exports.

```sh
# Using npm
npm install mmcov --save-dev

# Using pnpm
pnpm add -D mmcov
```

### Basic Usage

To generate a report, you must import the `generateLcovReport` function and provide an Options configuration object. This function orchestrates the parsing of your `lcov.info` file, syntax highlighting via Shiki, and the generation of minified HTML files.

#### Example Implementation

```js
import { generateLcovReport } from "mmcov";

const options = {
  lcovPath: "./coverage/lcov.info",
  sourceDirs: ["lib", "src"],
  destDir: "./docs/coverage",
  projectTitle: "My Project Coverage",
  favicon: "./assets/favicon.ico",
};

await generateLcovReport(options);
```

### Configuration

| Option       | Type     | Required | Description                                                                                          |
| ------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------- |
| lcovPath     | string   | Yes      | Path to the `lcov.info` file relative to the current working directory                               |
| sourceDirs   | string[] | Yes      | Directories containing the source code (e.g., ["src"]). Used to resolve file paths found in the LCOV |
| destDir      | string   | No       | Target directory for HTML output. Defaults to "docs/coverage"                                        |
| projectTitle | string   | No       | Title displayed in the header of the generated HTML pages                                            |
| favicon      | string   | No       | Path to a custom `.ico` file. If omitted, a default icon is used                                     |

## UI

![Home Dark](./public/home_ss_dark.png)

![Home Light](./public/home_ss_light.png)
