import { range } from "../../src/utils/index";

describe("range()", () => {
	let genRange: number[];
	let expectedRange: number[];
	type RangeParams = {
		start: number;
		end: number;
		step: number;
	};
	let	rangeParams: RangeParams;
	beforeEach(() => {
		expectedRange = [];
		genRange = [];
		rangeParams = {
			start: 0,
			end: 0,
			step: 0
		};
	});
	describe("Overloads / Defaulting", () => {
		test("range(stop) returns [0 .. stop-1]", () => {
			rangeParams.end = 5;
			const end = rangeParams.end;
			genRange = range(end);
			expectedRange = [0, 1, 2, 3, 4];

			expect(genRange).toEqual(expectedRange);
		});
		test("range(start, stop) returns [start .. stop-1]", () => {
			rangeParams.start = 2;
			rangeParams.end = 5;
			const { start, end } = rangeParams;
			genRange = range(start, end);
			expectedRange = [2, 3, 4];

			expect(genRange).toEqual(expectedRange);
		});
		test("range(start, stop, step) returns correctly spaced values", () => {
			rangeParams = { 
				start: 2,
				end: 10,
				step: 2
			};
			const { start, end, step } = rangeParams;
			genRange = range(start, end, step);
			expectedRange = [2, 4, 6, 8];

			expect(genRange).toEqual(expectedRange);
		});
		test("range(0) returns []", () => {
			rangeParams.start = 0;
			const start = rangeParams.start;
			genRange = range(start);
			expectedRange = [];

			expect(genRange).toEqual(expectedRange);
		});
	});
	describe("Standard ranges (should return correct arrays).", () => {
		test.each([
			["with step 1", { start: 0, end: 5, step: 1 }, [0, 1, 2, 3, 4]],
			["custom step 2", { start: 2, end: 9, step: 2 }, [2, 4, 6, 8]],
			["with non-integer span", { start: 0, end: 5, step: 2 }, [0, 2, 4]],
			["empty when start = stop", { start: 5, end: 5, step: 1 }, []],
			["empty when start > stop", { start: 10, end: 5, step: 2 }, []],
		] as const)(
		"Generates range: %s.",
		(_desc, params, expected) => {
			const { start, end, step } = params;
			expect(range(start, end, step)).toEqual(expected);
		});
	});
	describe("Edge & advanced ranges (should handle edge cases)", () => {
		test.each([
			["for negative start", { start: -3, end: 2, step: 1 }, [-3, -2, -1, 0, 1]],
			["with fractional step", { start: 0.5, end: 2, step: 0.5 }, [0.5, 1.0, 1.5]],
			["single-element if step > span", { start: 0, end: 2, step: 5 }, [0]],
			["decreasing with negative step", { start: 5, end: 0, step: -1 }, [5, 4, 3, 2, 1]],
		] as const)(
		"Generates range: %s.",
		(_desc, params, expected) => {
			const { start, end, step } = params;
			expect(range(start, end, step)).toEqual(expected);
		});
		test("Throws when step is zero.", () => {
			rangeParams = { start: 0, end: 5, step: 0 };
			let { start, end, step } = rangeParams;
			expect(() => range(start, end, step)).toThrow();
		});
		test("negative step but start < stop returns []", () => {
			rangeParams = { 
				start: 0,
				end: 5,
				step: -1
			};
			const { start, end, step } = rangeParams;
			genRange = range(start, end, step);
			expectedRange = [];

			expect(genRange).toEqual(expectedRange);
		});
		test("Throws RangeError when step is zero", () => {
			rangeParams = { 
				start: 0,
				end: 5,
				step: 0
			};
			const { start, end, step } = rangeParams;
			const genRangeErr = () => range(start, end, step);

			expect(genRangeErr).toThrow(RangeError);
		});
	});
	describe("Parameter validation (throws TypeError)", () => {
		test.each([
			["NaN",        [NaN]],
			["Infinity",   [Infinity]],
			["non-number", ["foo"] as any],
			["bad 2-arg",  ["foo", 5] as any],
			["bad 3-arg",  [0, 5, "bar"] as any],
		] as const)(
			  "%s → throws TypeError",
			  (_desc, args) => {
				expect(() => (range as any)(...args)).toThrow(TypeError);
		  }
		);
	});
});
