<!-- markdownlint-disable MD033 -->
# <img src="./public/star.svg" alt="mmcov" width="20" hight="20" /> mmcov

A technical tool designed to transform raw lcov coverage data into human-readable, static HTML reports.

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

## Features

- The `mmcov` pipeline transforms raw LCOV data into a navigable, minified HTML report.
- The coverage badge system in `mmcov` provides a visual summary of the project's health by calculating an aggregate coverage metric and generating embeddable assets.

## UI

### Home

<img src="./public/home-light.png" width="400" alt="home-light" />
<img src="./public/home-dark.png" width="400" alt="home-dark" />

### File

<img src="./public/file-light.png" width="400" alt="file-light" />
<img src="./public/file-dark.png" width="400" alt="file-dark" />

### Badge

<img src="./public/badge-light.png" width="800" alt="home-light" />
<img src="./public/badge-dark.png" width="800" alt="home-dark" />
