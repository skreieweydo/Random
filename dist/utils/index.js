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
const isFloat = (n) => Number.isFinite(n) && !Number.isInteger(n);
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
const seqℕ = (n, options = {}) => {
    const { includeZero = true } = options;
    // Validate that n is a real finite number
    if (typeof n !== 'number' || Number.isNaN(n) || !Number.isFinite(n)) {
        throw new TypeError(`seqℕ: 'n' must be a finite number. Received: ${n}.`);
    }
    // Floor and clamp to zero
    const length = Math.floor(n);
    const count = length > 0 ? length : 0;
    // Build the sequence
    return Array.from({ length: count }, (_, i) => includeZero ? i : i + 1);
};
function range(startOrEnd, maybeEnd, maybeStep) {
    // 1. Determine start, stop, step based on arguments
    let start, end, step;
    if (maybeEnd === undefined) {
        // Called as range(stop)
        start = 0;
        end = startOrEnd;
        step = 1;
    }
    else if (maybeStep === undefined) {
        // Called as range(start, stop)
        start = startOrEnd;
        end = maybeEnd;
        step = 1;
    }
    else {
        // Called as range(start, stop, step)
        start = startOrEnd;
        end = maybeEnd;
        step = maybeStep;
    }
    // 2. Validate inputs are finite numbers
    for (const [name, value] of [
        ["start", start],
        ["stop", end],
        ["step", step],
    ]) {
        if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
            throw new TypeError(`range: ${name} must be a finite number. Received: ${value}.`);
        }
    }
    // 3. Disallow zero step
    if (step === 0) {
        throw new RangeError("range: step cannot be 0");
    }
    // 4. Early exit for empty sequences
    const direction = Math.sign(step);
    if ((direction > 0 && start >= end) || (direction < 0 && start <= end)) {
        return [];
    }
    return Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
}
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
function validateNumber(name, value) {
    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
        throw new Error(`${name} must be a valid number.`);
    }
}
export { isFloat, seqℕ, range, validateNumber };
