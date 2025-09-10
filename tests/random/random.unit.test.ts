import { Random } from "../../src/index";
import { isFloat, seqℕ, range } from "../../src/utils/index";

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
		describe("Constructor: Valid Input", () => {
			test("Creates instance with default parameters.", () => {
				const r = new Random();
				expect(r.min).toBe(0);
				expect(r.max).toBe(1);
			});

			test("Creates instance with custom min and max.", () => {
				const r = new Random(3, 7);
				expect(r.min).toBe(3);
				expect(r.max).toBe(7);
			});
			test("Creates instance with valid min and max.", () => {
				const min = 0;
				const max = 5;
				const r = new Random(min, max);
				const rMin = r.min;
				const rMax = r.max;
				expect(rMin).toBe(min);
				expect(rMax).toBe(max);
			});
		});
		describe("Constructor: min > max Constraint", () => {
			test("Throws error if min > max during during construction.", () => {
				errorStr = "Minimum cannot be greater than maximum.";
				errR = () => new Random(10, 5);
				expect(errR).toThrow(errorStr);
			});
		});
		describe("Constructor: Invalid Parameter Types or Values", () => {
			let errorNumStr: string;
			let errorFinStr: string;
			beforeAll(() => {
				errorNumStr = "Minimum and maximum must be numbers.";
				errorFinStr = "Minimum and maximum must be finite numbers.";
			});
			describe("Invalid type - minimum", () => {
				test("Throws if minimum is a string (invalid type).", () => {
					errorStr = errorNumStr;
					errR = () => new Random("5" as unknown as number, 10);
					expect(errR).toThrow(errorStr);
				});
				test("Throws error if minimum is null.", () => {
					errorStr = errorNumStr;
					errR = () => new Random(null as unknown as number, 10);
					expect(errR).toThrow(errorStr);
				});
			});
			describe("Invalid type - maximum", () => {
				test("Throws error if maximum is a string (invalid type).", () => {
					errorStr = errorNumStr;
					errR = () => new Random(0, "10" as unknown as number);
					expect(errR).toThrow(errorStr);
				});
				test("Throws if maximum is null.", () => {
					errorStr = errorNumStr;
					errR = () => new Random(0, null as unknown as number);
					expect(errR).toThrow(errorStr);
				});
			});
			describe("Non-finite — minimum", () => {
				test("Throws if minimum is NaN.", () => {
					errorStr = errorFinStr;
					errR = () => new Random(NaN, 10);
					expect(errR).toThrow(errorStr);
				});
				test("Throws if minimum is -Infinity.", () => {
					errorStr = errorFinStr;
					errR = () => new Random(-Infinity, 1);
					expect(errR).toThrow(errorStr);
				});
				test("Throws if minimum is Infinity.", () => {
					errorStr = errorFinStr;
					errR = () => new Random(Infinity, 1);
					expect(errR).toThrow(errorStr);
				});
			});
			describe("Non-finite — maximum", () => {
				test("Throws if maximum is NaN.", () => {
					errorStr = errorFinStr;
					errR = () => new Random(5, NaN);
					expect(errR).toThrow(errorStr);
				});
				test("Throws error if maximum is -Infinity.", () => {
					errorStr = errorFinStr;
					errR = () => new Random(undefined, -Infinity);
					expect(errR).toThrow(errorStr);
				});
				test("Throws error if maximum is Infinity", () => {
					errorStr = errorFinStr;
					errR = () => new Random(0, Infinity);
					expect(errR).toThrow(errorStr);
				});
			});
			describe("Extremes accepted", () => {
				test("Accepts Number.MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.", () => {
					const r = new Random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
					expect(r.min).toBe(Number.MIN_SAFE_INTEGER);
					expect(r.max).toBe(Number.MAX_SAFE_INTEGER);
				});
			});
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
		test("Throws error if non-number passed to 'min' setter.", () => {
			errorStr = "Minimum must be a valid number."
			errR = () => { (random.min as any) = "abc"; }
			expect(errR).toThrow(errorStr);
		});
		test("Throws error if NaN passed to 'max' setter.", () => {
			errorStr = "Maximum must be a valid number.";
			errR = () => { random.max = NaN; };
			expect(errR).toThrow(errorStr);
		});
	});
	describe("Runtime Type Safety for Setters", () => {
		let errorMinNumStr: string;
		let errorMaxNumStr: string;
		beforeAll(() => {
			errorMinNumStr = "Minimum must be a valid number.";
			errorMaxNumStr = "Maximum must be a valid number.";
		});
		test("Throws if min is a string.", () => {
			errorStr = errorMinNumStr;
			errR = () => { random.min = "5" as any; };
			expect(errR).toThrow(errorStr);
		});
		test("Throws if max is a string.", () => {
			errorStr = errorMaxNumStr;
			errR = () => { random.max = "15" as any; };
			expect(errR).toThrow(errorStr);
		});
		test("Throws if min is Infinity.", () => {
			errorStr = errorMinNumStr;
			errR = () => { random.min = Infinity; };
			expect(errR).toThrow(errorStr);
		});
		test("Throws if max is -Infinity.", () => {
			errorStr = errorMaxNumStr;
			errR = () => { random.max = -Infinity; };
			expect(errR).toThrow(errorStr);
		});
		test("Throws if min > max.", () => {
			errorStr = "Minimum cannot be greater than maximum.";
			errR = () => { random.min = 15; };
			expect(errR).toThrow(errorStr);
		});
		test("Throws if max < min.", () => {
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
		test("randomInteger returns min when min == max.", () => {
			const minimumValue = 5;
			random.min = minimumValue;
			random.max = minimumValue;

			const minimum = random.randomInteger();
			expect(minimum).toBe(minimumValue);
		});
		test("randomInteger over narrow range returns consistent value.", () => {
			const minimumValue = 3;
			random.min = minimumValue;
			random.max = minimumValue;
			for(let i = 0; i < 100; i++) {
				const minimum = random.randomInteger();
				expect(minimum).toBe(minimumValue);
			}
		});
	});

	describe("Random Selection from Arrays", () => {
		let result: number;
		beforeEach(() => {
			result = 0;
		});
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
		test("choice() works with one-element array.", () => {
			const value = 42;
			const valueArr = [value];
			const result = random.choice(valueArr);
			expect(result).toBe(value);
		});
		test("choice() works with negative values.", () => {
			const nums = [-5, -2, -1];
			const result = random.choice(nums);
			expect(nums).toContain(result);
		});
		test("choice() works with floats.", () => {
			const nums = range(1, 4);
			const scaledNums = nums.map(el => el / 10);
			const result = random.choice(scaledNums);
			expect(scaledNums).toContain(result);
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
		test("populate(1) returns single-element array.", () => {
			const n = 1;
			const arr = Random.populate(n);
			const arrLength = arr.length;
			expect(arrLength).toBe(n);
		});
		test("Throws if frac = true and end = 0 (division by zero).", () => {
			const n = 5;
			const start = 0;
			const end = 0;
			const frac = true;
			errR = () => Random.populate(n, start, end, frac);
			errorStr = "Division by zero error or invalid range.";
			expect(errR).toThrow(errorStr);
		});
	});
});
