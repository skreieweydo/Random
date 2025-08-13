# Random (TypeScript / JavaScript)

> A lightweight, validated wrapper around `Math.random()` with a clean API for bounded floats/ints, coin flips, array selection, and bulk generation.

[![Build Status](https://img.shields.io/github/actions/workflow/status/skr eieweydo/Random/ci.yml?branch=main)](https://github.com/skr eieweydo/Random/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [class Random](#class-random)
  - [Utilities](#utilities)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

JavaScript’s `Math.random()` is seedless and returns a float in `[0, 1)`. This library wraps it with a small, well-typed class and a few utilities so you can easily:
- generate bounded **floats** and **integers**,
- flip a bit (`0 | 1`),
- pick a random element from an array, and
- **populate** arrays efficiently.

Runtime validation guards catch invalid inputs early.

---

## Installation

Until this is published to npm, install directly from GitHub:

```bash
# HTTPS
npm i git+https://github.com/skreieweydo/Random.git

# or SSH
npm i git+ssh://git@github.com/skreieweydo/Random.git
````

> After publishing to npm, this becomes something like:
>
> ```bash
> npm i @skreieweydo/random
> ```
>
> (Update this section when published.)

---

## Quick Start

```ts
// If consumed directly from the repo:
import { Random } from "./src/Random";

// …or once published to npm:
// import { Random } from "@skreieweydo/random";

const rng = new Random(0, 10);

const f = rng.randomNumber();   // float in [0, 10)
const i = rng.randomInteger();  // integer in [0, 10)  (degenerate case min===max yields that exact value)
const b = rng.zeroOrOne();      // 0 or 1

const chosen = rng.choice([2, 4, 6, 8]);

// Bulk generation
const ints  = Random.populate(5, 1, 6);         // e.g., [1,2,3,2,5]
const fracs = Random.populate(5, 0, 100, true); // floats ~ [0, 1)
```

---

## API

### `class Random`

```ts
new Random(minimum = 0, maximum = 1)
```

* Validates **types**, **finiteness**, and **ordering** at construction.
* Throws:

  * `TypeError("Minimum and maximum must be numbers.")`
  * `TypeError("Minimum and maximum must be finite numbers.")`
  * `Error("Minimum cannot be greater than maximum.")`

#### Instance methods

| Method              | Signature                                       | Description                                                                                                                        |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `randomNumber()`    | `() => number`                                  | Uniform float in **\[min, max)**.                                                                                                  |
| `randomInteger()`   | `() => number`                                  | Uniform integer in **\[min, max)**. If `min === max`, returns that exact value.                                                    |
| `zeroOrOne()`       | `() => 0 \| 1`                                  | Random bit.                                                                                                                        |
| `choice`         | `(arr: number[]) => number`                               | Returns random element. Throws if the array is empty.                                                                              |
| `static populate()` | `(n, start=0, end=100, frac=false) => number[]` | Array of length `n`. Integers in **\[start, end)** by default; when `frac=true`, returns `integer / end` (≈ `[0,1)` if `start=0`). |

---

## Error Handling

* **Constructor / Setters (`min`, `max`):**

  * `TypeError` if values are not numbers or not finite.
  * `Error` if ordering is invalid (`min > max` / `max < min`).
* **`choice([])`** → `Error("Array cannot be empty.")`
* **`populate(n <= 0)`** → `Error("Count must be a positive number.")`
* **`populate(frac=true, end=0)`** → `Error("Division by zero error or invalid range.")`

---

## Utilities

If you export these from `src/utils.ts`, the library includes:

* `validateNumber(name: string, value: number): void`
  Throws if not a finite number.

* `isFloat(n: number): boolean`
  `true` for finite non-integers.

* `seqℕ(n: number, options?: { includeZero?: boolean }): number[]`
  Generates a length-`n` sequence starting at 0 (or 1 when `includeZero=false`).

* `range(...)`
  Python-like numeric range with overloads:

  * `range(stop)`
  * `range(start, stop)`
  * `range(start, stop, step)`
    Validates types/finiteness, disallows `step=0`, and returns `[]` on direction mismatch.

See inline JSDoc for exact signatures and behavior.

---

## Testing

```bash
npm test
```

* Uses Jest with TypeScript/Babel transform.
* High coverage across `Random` and utilities (thresholds configurable in `jest.config.js`).

---

## Roadmap

* **Phase 2:** Seeded PRNG interface (deterministic mode).
* **Phase 3:** Distributions (normal, exponential, etc.).
* **Phase 4:** CSPRNG option (Node/browser).
* **Phase 5:** Publish to npm + CI badges + typed examples.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "feat: add X"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

MIT — see [LICENSE](./LICENSE).
