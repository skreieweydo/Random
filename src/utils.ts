const isFloat = (n: number): boolean => Number.isFinite(n) && !Number.isInteger(n);
										// excludes NaN & Infinity
type seqℕOptions = {
	includeZero?: boolean;
};
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

// [start, end)
const range = (start: number, stop: number, step: number) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );

// Confirm it is a number type, that it's not NaN, and ensure it's not +Infinity or -Infinity
function validateNumber(name: string, value: number): void {
    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
        throw new Error(`${name} must be a valid number.`);
    }
}

export { isFloat, seqℕ, range, validateNumber };
