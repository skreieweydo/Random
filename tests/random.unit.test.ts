import { Random } from "../src/Random";

const isFloat = (n: number): boolean => Number.isFinite(n) && !Number.isInteger(n);
										// excludes NaN & Infinity

type seqℕOptions = {
	includeZero?: boolean;
};
const seqℕ = (n: number, includeZero: boolean = true): number[] => Array.from({ length: n }, (_, i) => includeZero ? i : i + 1);

// [start, end)
const range = (start: number, stop: number, step: number) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );


describe("Random Number Generator", () => {
	let random: Random;

	let errorStr: string;
	let errR: () => unknown;
	beforeEach(() => {
		random = new Random(0, 10);

		errorStr = "";
		errR = () => {};
	});

	describe("Initialization and Construction", () => {
		test("Creates instance with valid min and max.", () => {
			const min = 0;
			const max = 5;
			const r = new Random(min, max);
			const rMin = r.min;
			const rMax = r.max;
			expect(rMin).toBe(min);
			expect(rMax).toBe(max);
		});
		test("Throws error if min > max during during construction.", () => {
			errorStr = "Minimum cannot be greater than maximum.";
			errR = () => new Random(10, 5);
			expect(errR).toThrow(errorStr);
		});
	});

	describe("Min/Max Configuration via Setters", () => {
		test("Correctly updates min and max values.", () => {
			const min = 2;
			const max = 20;
			random.min = min;
			random.max = max;
			const rMin = random.min;
			const rMax = random.max;
			expect(rMin).toBe(min);
			expect(rMax).toBe(max);
		});
		test("Throws error when min > max using setter.", () => {
			errorStr = "Minimum cannot be greater than maximum.";
			errR = () => { random.min = 15; };
			expect(errR).toThrow(errorStr);
		});
		test("Throws error when max < min using setter.", () => {
			errorStr = "Maximum cannot be less than minimum.";
			errR = () => { random.max = -5; };
			expect(errR).toThrow(errorStr);
		});
	});

	describe("Random Value Generation", () => {
		let val: number | typeof NaN;
		let rMin: number | typeof NaN;
		let rMax: number | typeof NaN;

		test("randomNumber produces a value within [min, max).", () => {
			val = random.randomNumber();
			rMin = random.min;
			rMax = random.max;
			expect(val).toBeGreaterThanOrEqual(rMin);
			expect(val).toBeLessThan(rMax);
		});
		test("randomNumber result is a float (not an integer).", () => {
			val = random.randomNumber();
			const isValFloat = isFloat(val);
			expect(isValFloat).toBeTruthy();
		});
		test("randomInteger returns integer in [min, max].", () => {
			val = random.randomInteger();
			const valIsInt = Number.isInteger(val);
			rMin = random.min;
			rMax = random.max;
			expect(val).toBeGreaterThanOrEqual(rMin);
			expect(val).toBeLessThan(rMax);
			expect(valIsInt).toBeTruthy();
		});
		test("zeroOrOne returns either 0 or 1.", () => {
			const zeroAndOne = seqℕ(2);
			val = random.zeroOrOne();
			expect(zeroAndOne).toContain(val);
		});
	});

	describe("Random Selection from Arrays", () => {
		test("choice() selects an element from array.", () => {
			const nums = range(2, 9, 2);
			const result = random.choice(nums);
			expect(nums).toContain(result);
		});
		test("choice() throws on empty array.", () => {
			errorStr = "Array cannot be empty.";
			errR = () => random.choice([]);
			expect(errR).toThrow(errorStr);
		});
	});

	describe("Static Method: populate()", () => {
		let arr: number[];
		let n: number;
		type Range = {
			start: number;
			end: number;
		};
		let range: Range;
		test("Creates array of specified length.", () => {
			n = 5;
			range = { start: 1, end: 5 };
			const { start, end } = range;
			arr = Random.populate(n, start, end);
			const arrLength = arr.length;
			expect(arrLength).toBe(n);
		});
		test("Produces values within [start, end] range.", () => {
			n = 10;
			range = { start: 0, end: 20 };
			const { start, end } = range;
			arr = Random.populate(n, start, end);
			arr.forEach(val => {
				expect(val).toBeGreaterThanOrEqual(start);
				expect(val).toBeLessThanOrEqual(end);
			});
		});
		test("Supports fractional mode with values in [0, 1].", () => {
			n = 10;
			range = { start: 0, end: 100 };
			const { start, end } = range;
			const isFractional = true;
			arr = Random.populate(n, start, end, isFractional);
            arr.forEach(val => {
                expect(val).toBeGreaterThanOrEqual(start);
                expect(val).toBeLessThanOrEqual(end);
            });
		});
		test("Throws error for zero or negative length.", () => {
			errorStr = "Count must be a positive number.";
			errR = () => Random.populate(0);
			expect(errR).toThrow(errorStr);
		});
	});
});
