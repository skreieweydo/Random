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
const isFloat = (n: number): boolean => Number.isFinite(n) && !Number.isInteger(n);
										// excludes NaN & Infinity
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
const seqℕ = (n: number, options: seqℕOptions = {}): number[] => {
	const { includeZero = true } = options;
	// Validate that n is a real finite number
	if (typeof n !== 'number' || Number.isNaN(n) || !Number.isFinite(n)) {
		throw new TypeError(`seqℕ: 'n' must be a finite number. Received: ${n}.`);
	}

	// Floor and clamp to zero
	const length = Math.floor(n);
	const count  = length > 0 ? length : 0;

	// Build the sequence
	return Array.from({ length: count }, (_, i) =>
	  includeZero ? i : i + 1
	);
};
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
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
function range(startOrEnd: number, maybeEnd?: number, maybeStep?: number): number[] {
	// 1. Determine start, stop, step based on arguments
	let start: number, end: number, step: number;
	if (maybeEnd === undefined) {
	// Called as range(stop)
		start = 0;
		end  = startOrEnd;
		step  = 1;
    } else if (maybeStep === undefined) {
	    // Called as range(start, stop)
	    start = startOrEnd;
        end  = maybeEnd;
	    step  = 1;
	} else {
		// Called as range(start, stop, step)
		start = startOrEnd;
		end  = maybeEnd;
		step  = maybeStep;
	}

	// 2. Validate inputs are finite numbers
	for (const [name, value] of [
		["start", start],
		["stop",  end],
		["step",  step],
	] as const) {
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

    return Array.from(
		{ length: Math.ceil((end - start) / step) },
		(_, i) => start + i * step,
	);
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
function validateNumber(name: string, value: number): void {
    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
        throw new Error(`${name} must be a valid number.`);
    }
}

export { isFloat, seqℕ, range, validateNumber };
