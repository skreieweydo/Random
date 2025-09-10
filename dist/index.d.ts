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
export declare class Random {
    private minimum;
    private maximum;
    /**
     * Constructs a `Random` instance with the given inclusive lower bound and
     * exclusive upper bound semantics for floating draws.
     *
     * @param minimum - Lower bound for the range (default `0`).
     * @param maximum - Upper bound for the range (default `1`).
     * @throws {Error} If either bound is not a finite number.
     * @throws {Error} If `minimum > maximum`.
     */
    constructor(minimum?: number, maximum?: number);
    /**
      * Updates the minimum bound.
      * @throws {Error} If the value is not a finite number or `value > max`.
      */
    set min(value: number);
    /**
      * Current minimum bound of the generator.
      */
    get min(): number;
    /**
      * Updates the maximum bound.
      * @throws {Error} If the value is not a finite number or `value < min`.
      */
    set max(value: number);
    /**
      * Current maximum bound of the generator.
      */
    get max(): number;
    /**
      * Returns a uniformly distributed floating-point number in the half-open
      * interval `[min, max)`.
      *
      * @returns A float `x` such that `min ≤ x < max`.
      */
    randomNumber(): number;
    /**
      * Returns a uniformly distributed integer in the half-open interval
      * `[min, max)` (i.e., `min` inclusive, `max` exclusive).
      *
      * @returns An integer `k` such that `min ≤ k < max`.
      */
    randomInteger(): number;
    /**
      * Returns either `0` or `1` with approximately equal probability.
      *
      * @returns `0` or `1`.
      */
    zeroOrOne(): number;
    /**
      * Returns a random element from a non-empty array.
      *
      * @param nums - The array to choose from.
      * @returns One element of `nums`, chosen uniformly at random.
      * @throws {Error} If `nums` is empty.
      */
    choice(nums: number[]): number;
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
    static populate(n: number, start?: number, end?: number, frac?: boolean): number[];
}
