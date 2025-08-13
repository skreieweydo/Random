# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-08-13
### Added
- `Random` class with method-based API: `randomNumber()`, `randomInteger()`, `zeroOrOne()`.
- `choice()` for array element selection (throws on empty arrays).
- `Random.populate(n, start=0, end=100, frac=false)` for bulk generation.
- Runtime validation across constructor + setters (type, finiteness, ordering).
- Utilities: `validateNumber`, `isFloat`, `seqℕ`, `range` (Python-like with overloads).
- JSDoc across public API and updated README.

### Changed
- Converted non-deterministic getters to **methods** (breaking with previous drafts).
- Consolidated test utilities into `src/utils.ts`.

### Fixed
- Guard against division by zero in `populate(frac=true, end=0)`.

### Tests
- Comprehensive Jest suite for `Random` and utils (`range`, `seqℕ`, `isFloat`, `validateNumber`).
- Table-driven tests and edge-case coverage (incl. `min===max`, negative ranges, fractional steps).

### Docs
- README aligned with method-based API, install/usage, error handling, and roadmap.

### Breaking Changes
- If you consumed previous *getter-style* API (`randomNumber` as a getter, etc.), migrate to **method calls**:
  - Before: `rng.number` / `rng.integer`
  - After: `rng.randomNumber()` / `rng.randomInteger()`

[1.0.0]: https://github.com/skr eieweydo/Random/releases/tag/v1.0.0
