import { validateNumber } from "./utils/index.js";
/**
 * A lightweight wrapper around `Math.random()` that provides
 * convenience methods for common random operations over a numeric range.
 *
 * - Uses half-open intervals for floating-point draws: `[min, max)`
 * - Validates inputs (finite numbers; `min <= max`)
 * - Non-deterministic APIs are exposed as **methods** (not getters)
 *
 * @example
 * const rng = new Random(0, 10);
 * const x = rng.randomNumber();   // 0 ≤ x < 10
 * const i = rng.randomInteger();  // 0 ≤ i < 10 (integer)
 */
export class Random {
    // All draws are half-open: floats & ints ∈ [min, max)
    minimum;
    maximum;
    // Math.random(): [0, 1)
    // default: (0, 1)
    /**
     * Constructs a `Random` instance with the given inclusive lower bound and
     * exclusive upper bound semantics for floating draws.
     *
     * @param minimum - Lower bound for the range (default `0`).
     * @param maximum - Upper bound for the range (default `1`).
     * @throws {Error} If either bound is not a finite number.
     * @throws {Error} If `minimum > maximum`.
     */
    constructor(minimum = 0, maximum = 1) {
        if (typeof minimum !== "number" || typeof maximum !== "number") {
            throw new TypeError("Minimum and maximum must be numbers.");
        }
        if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) {
            throw new TypeError("Minimum and maximum must be finite numbers.");
        }
        validateNumber("Minimum", minimum);
        validateNumber("Maximum", maximum);
        if (minimum > maximum) {
            throw new Error("Minimum cannot be greater than maximum.");
        }
        this.minimum = minimum;
        this.maximum = maximum;
    }
    // Accessors for min and max with validation
    /**
      * Updates the minimum bound.
      * @throws {Error} If the value is not a finite number or `value > max`.
      */
    set min(value) {
        validateNumber("Minimum", value);
        if (value > this.maximum) {
            throw new Error("Minimum cannot be greater than maximum.");
        }
        this.minimum = value;
    }
    /**
      * Current minimum bound of the generator.
      */
    get min() {
        return this.minimum;
    }
    /**
      * Updates the maximum bound.
      * @throws {Error} If the value is not a finite number or `value < min`.
      */
    set max(value) {
        validateNumber("Maximum", value);
        if (value < this.minimum) {
            throw new Error("Maximum cannot be less than minimum.");
        }
        this.maximum = value;
    }
    /**
      * Current maximum bound of the generator.
      */
    get max() {
        return this.maximum;
    }
    // The number and integer methods are designed to return values inclusive of the maximum and minimum. However, the way the random number is generated can lead to confusion. The Math.random() function generates a number in the range [0, 1), so the formula should be adjusted to ensure inclusivity.
    // Methods (not accessors) for random generation
    /**
      * Returns a uniformly distributed floating-point number in the half-open
      * interval `[min, max)`.
      *
      * @returns A float `x` such that `min ≤ x < max`.
      */
    randomNumber() {
        return Math.random() * (this.maximum - this.minimum) + this.minimum;
    }
    /**
      * Returns a uniformly distributed integer in the half-open interval
      * `[min, max)` (i.e., `min` inclusive, `max` exclusive).
      *
      * @returns An integer `k` such that `min ≤ k < max`.
      */
    randomInteger() {
        return Math.floor(this.randomNumber());
    }
    /**
      * Returns either `0` or `1` with approximately equal probability.
      *
      * @returns `0` or `1`.
      */
    zeroOrOne() {
        return Math.round(Math.random());
    }
    // modifies the state of the Random instance by changing minimum and maximum. This could lead to unintended side effects if the same instance is reused. Consider creating a new instance or resetting the state after the choice is made.
    /**
      * Returns a random element from a non-empty array.
      *
      * @param nums - The array to choose from.
      * @returns One element of `nums`, chosen uniformly at random.
      * @throws {Error} If `nums` is empty.
      */
    choice(nums) {
        if (nums.length === 0) {
            throw new Error("Array cannot be empty.");
        }
        const indexGen = new Random(0, nums.length);
        return nums[indexGen.randomInteger()];
    }
    // creates a new Random instance for each random number generated. This is inefficient. Instead, consider creating a single instance and reusing it.
    /**
    * Generates an array of length `n` filled with random values drawn from the given range.
    *
    * Behavior:
    * - When `frac === false` (default): returns integers in `[start, end)` (upper exclusive),
    *   i.e., possible values are `start, start+1, ..., end-1`.
    * - When `frac === true`: returns scaled values by computing `integer / end`.
    *   If `start === 0` this yields values in `[0, 1)`. If `start !== 0`, the range is
    *   `[start/end, (end-1)/end]`.
    *
    * @param n      Number of elements to produce (must be > 0).
    * @param start  Lower bound for the integer generator (default `0`).
    * @param end    Upper bound for the integer generator (default `100`).
    * @param frac   When `true`, returns normalized floats as described above; otherwise integers.
    * @returns      An array of random values of length `n`.
    *
    * @throws {Error}    If `n <= 0`.
    * @throws {Error}    If `frac === true` and `end === 0` (division by zero).
    * @throws {Error}    If `start > end` (propagated from the underlying `Random` validation).
    * @throws {TypeError} If `start` or `end` are not finite numbers (propagated from `Random`).
    *
    * @remarks
    * - Time complexity: O(n).
    * - If you require `[0, 1)` in fractional mode, ensure `start === 0` and `end > 0`.
    */
    static populate(n, start = 0, end = 100, frac = false) {
        if (n <= 0) {
            throw new Error("Count must be a positive number.");
        }
        if (frac && end === 0) {
            throw new Error("Division by zero error or invalid range.");
        }
        const generator = new Random(start, end);
        return Array.from({ length: n }, _ => {
            const randNum = generator.randomInteger();
            return frac ? randNum / end : randNum;
        });
    }
}
