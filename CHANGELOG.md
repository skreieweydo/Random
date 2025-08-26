# Changelog
All notable changes to this project will be documented here.

## [1.0.0] - 2025-08-26

### Highlights
- **Method-based API**: `randomNumber()`, `randomInteger()`, `zeroOrOne()`
- **Bulk generation**: `Random.populate()` with input validation
- **Utilities**: `validateNumber`, `isFloat`, `seqℕ`, `range` (Python-like)
- **Predictable ranges**: half-open by default (`[min, max)`) → fewer off-by-ones
- **Zero dependencies** • **Privacy:** no data collected
- Strong runtime validation, thorough tests, updated README + JSDoc

### Added
- `Random` class with methods for bounded floats/ints and coin flips
- `choice<T>(array: T[])` for uniform element selection (throws on empty arrays)
- `Random.populate(n, start, end, frac?)` for bulk generation (ints by default; floats when `frac=true`)
- Utils: `validateNumber`, `isFloat`, `seqℕ`, `range`

### Changed
- Non-deterministic **getters** → **methods** (API modernization)

### Fixed
- Division-by-zero guard in `populate(frac=true, end=0)`

### Tests
- Table-driven and edge-case coverage across `Random` + utilities

### Docs
- README and JSDoc aligned with the Phase 1 API and usage

### Breaking Changes
- Replace property-style access with method calls:
  - **Before:** `rng.number`, `rng.integer`
  - **After:**  `rng.randomNumber()`, `rng.randomInteger()`

---

## 🧠 API Details (Contract)

### Constructor
```ts
new Random(min: number, max: number)
````

* **Semantics:** draws use **half-open interval** `[min, max)` for both integers and floats.
* **Validation:** `min` and `max` must be finite numbers with `min < max`; otherwise an error is thrown.
* **Ranges:** supports negative bounds and large ranges (within JS number precision).

### Instance Methods

```ts
randomNumber(): number   // returns x where min ≤ x < max
randomInteger(): number  // returns i where min ≤ i < max (integer)
zeroOrOne(): 0 | 1       // coin flip (uniform)
choice<T>(arr: T[]): T   // uniform pick; throws if arr.length === 0
```

* All methods respect the constructor’s `[min, max)` bounds.

### Static Methods

```ts
Random.populate(
  n: number,
  start: number,
  end: number,
  frac?: boolean
): number[]
```

* **Purpose:** generate `n` values in `[start, end)`.
* **`frac` flag:** `false` (default) → integers; `true` → floats.
* **Validation:** `n > 0`, `start < end`, all inputs finite. Guards division-by-zero when `frac=true` & `end=0`.
* **Returns:** an array of length `n` (no silent empties).

### Utilities

```ts
validateNumber(x: unknown): asserts x is number   // finite, not NaN
isFloat(x: number): boolean                       // true if not an integer
seqℕ(n: number): number[]                         // [0,1,2,…,n-1]
range(start: number, end: number, step=1): number[] // Python-like; half-open
```

### Edge Cases

* **Invalid bounds** (`min >= max`): constructor throws with a clear message.
* **Empty input** in `choice([])`: throws with a clear message.
* **Large ranges / precision:** calculations avoid common bias within IEEE-754 limits.

### Examples

```ts
const rng = new Random(1, 7);   // [1,7)
rng.randomInteger();            // 1..6
rng.randomNumber();             // 1 ≤ x < 7

new Random(-5, 0).randomInteger(); // -5..-1
Random.populate(5, 10, 20);        // [10..19] (length 5)
Random.populate(3, 0, 1, true);    // 3 floats in [0,1)
```

---

[1.0.0]: https://github.com/skreieweydo/random/releases/tag/v1.0.0

```

If you want, I can also update your **GitHub Release Notes** to mirror this (shorter “Highlights” + a link back to the full API Details in the changelog).
```
