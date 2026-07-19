<!-- markdownlint-disable -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.4]-2026-07-19

## Fixed

- Missing `cli` documentation in README.md.

## [0.0.3]-2026-07-19

### Fixed

- Top level `await` in `lib/generator/shiki.ts` for commonjs output error.
- Add `highlighter.dispose()` at `lib/generator/shiki.ts` to prevent multi call the highlighter instance.

### Added

- Check the content of the lcov file are valid lcov format or not.(private method `isLcov` at `ReportGenerator` class.).
- Add cli with same options with programmatic usage.

### Changed

- Required `options.sourceDirs` to optional `options.sourceDirs`.

---

## [0.0.2]-2026-07-19

### Added

- Generate coverage report for `Lines`,`Functions` and `Branches`.
- Partial calculation of overall coverage.
  `(lines.hit+functions.hit+branches.hit/lines.found+functions.found+branches.found) * 100`
- Generate static HTML, minified with `html-minifier-next`.
- Syntax Highlighting with `shiki` for every file level output code.

### TODO

- Add `cli` features.

<!--
https://keepachangelog.com/en/1.1.0/
Added :  for new features.
Changed : for changes in existing functionality.
Deprecated : for soon-to-be removed features.
Fixed : for any bug fixes.
Security : in case of vulnerabilities.
 -->
