/**
 * Returns `true` if `n` is a finite, non-integer (i.e., a floating-point) number.
 *
 * Excludes `NaN`, `Infinity`, and `-Infinity`.
 *
 * @param n - The value to test.
 * @returns `true` if `n` is finite and not an integer; otherwise `false`.
 *
 * @example
 * isFloat(3.14); // true
 * isFloat(7);    // false
 * isFloat(NaN);  // false
 */
declare const isFloat: (n: number) => boolean;
type seqℕOptions = {
    includeZero?: boolean;
};
/**
 * Generates a sequence of natural numbers with optional zero-inclusion.
 * - If `includeZero` is `true` (default), returns `[0, 1, 2, ..., n-1]`.
 * - If `includeZero` is `false`, returns `[1, 2, ..., n]`.
 *
 * Fractional `n` is floored; negative `n` yields an empty array.
 * Throws if `n` is not a finite number (e.g., `NaN`, `Infinity`).
 *
 * @param n - Desired count (floored, clamped to 0).
 * @param options.includeZero - Include zero as the first element (default `true`).
 * @returns The generated sequence.
 *
 * @throws {TypeError} If `n` is not a finite number.
 *
 * @example
 * seqℕ(5);                 // [0, 1, 2, 3, 4]
 * seqℕ(5, { includeZero: false }); // [1, 2, 3, 4, 5]
 * seqℕ(3.7);              // [0, 1, 2]
 * seqℕ(-2);               // []
 */
declare const seqℕ: (n: number, options?: seqℕOptions) => number[];
/**
 * Generates a numeric sequence like Python’s `range()`:
 *
 * Overloads:
 * - `range(stop)` → `[0, 1, ..., stop-1]`
 * - `range(start, stop)` → `[start, ..., stop-1]`
 * - `range(start, stop, step)` → step can be positive or negative; `stop` is exclusive
 *
 * Validates that all parameters are finite numbers and that `step !== 0`.
 * Returns `[]` if the step direction does not move from `start` toward `stop`.
 *
 * @param startOrEnd - When called with 1 arg, this is `stop`; with 2–3 args, this is `start`.
 * @param maybeEnd - Optional `stop` when using 2–3 arg forms.
 * @param maybeStep - Optional `step` when using 3 arg form (default `1`).
 * @returns The generated numeric sequence (exclusive of `stop`).
 *
 * @throws {TypeError} If any argument is not a finite number (e.g., `NaN`, `Infinity`).
 * @throws {RangeError} If `step === 0`.
 *
 * @example
 * range(5);            // [0, 1, 2, 3, 4]
 * range(2, 5);         // [2, 3, 4]
 * range(10, 2, -2);    // [10, 8, 6, 4]
 * range(1, 2, 0.25);   // [1, 1.25, 1.5, 1.75]
 * range(0, 5, -1);     // [] (direction mismatch)
 */
declare function range(end: number): number[];
declare function range(start: number, end: number): number[];
declare function range(start: number, end: number, step: number): number[];
/**
 * Validates that `value` is a finite JavaScript number (not `NaN`, not ±`Infinity`).
 *
 * @param name - A label used in the error message (e.g., `"Minimum"`).
 * @param value - The value to validate.
 * @throws {Error} If `value` is not a finite number.
 *
 * @example
 * validateNumber("Minimum", 0);     // ok
 * validateNumber("Maximum", 42.5);  // ok
 * validateNumber("Minimum", NaN);   // throws Error
 */
declare function validateNumber(name: string, value: number): void;
export { isFloat, seqℕ, range, validateNumber };
