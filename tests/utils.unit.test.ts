import { validateNumber, isFloat, seqℕ, range } from "../src/utils";

describe("Utils", () => {
	let errR: () => unknown;
	let valObj: {
		label: string;
		value: number | typeof NaN;
	};
	beforeEach(() => {
		errR = () => {};
		valObj = { label: "Test", value: 0 };
	});
	describe("validateNumber", () => {
		describe("Valid inputs (should not throw)", () => {   
			test.each([
				["positive integer", 123],
				["negative float", -4.56],
				["zero", 0]
			] as const)(
			"%s: should not throw",
			(_desc, v) => {
				valObj.value = v;
				const { label, value } = valObj;
				expect(() => validateNumber(label, value)).not.toThrow();
			});
		});
		describe("Invalid inputs (should throw)", () => {
			let errorStr: string;
			beforeEach(() => {
				errorStr = "Test must be a valid number.";
			});

			const invalidNumberMap = {
				NaN: NaN,
				Infinity: Infinity,
				"-Infinity": -Infinity,
				"non-number type": "string" as unknown as number,
				undefined: undefined as any,
				null: null as any,
				boolean: true as any,
				object: {} as any,
				array: [1, 2] as any,
				function: (() => 3) as any
			} as const;
			type InvalidNumberEntry =  { [K in keyof typeof invalidNumberMap]: [K, typeof invalidNumberMap[K]] }[keyof typeof invalidNumberMap];
			const invalidEntries: InvalidNumberEntry[] = Object.entries(invalidNumberMap) as InvalidNumberEntry[];
			test.each(invalidEntries)(
			"%s: should throw",
			(_desc, v) => {
				valObj.value = v;
				const { label, value } = valObj;
				expect(() => validateNumber(label, value)).toThrow(errorStr);
			});
		});
	});
	describe("isFloat()", () => {
		let isNumFloat: boolean;
		beforeEach(() => {
			isNumFloat = false;
		});
		describe("Valid floats (should return true)", () => {
			test.each([
				["non-integer finite number", 3.14],
				["non-negative finite number", -2.718],
				["very small nonzero float (MIN_VALUE)", Number.MIN_VALUE]
			] as const)(
			"%s: returns true.",
			(_desc, v) => {
				isNumFloat = isFloat(v);
				expect(isNumFloat).toBeTruthy();
			});
		});
		describe("Non-float numbers (should return false)", () => {
			test.each([
				["integer", 7],
				["non-integer float", 5.0],
				["zero", 0],
				["negative zero", -0],
				["NaN", NaN],
				["Infinity", Infinity],
				["-Infinity", -Infinity],
			] as const)(
			"%s: returns false.",
			(_desc, v) => {
				isNumFloat = isFloat(v);
				expect(isNumFloat).toBeFalsy();
			});
		});
	});
	describe("seqℕ()", () => {
		let genSeq: number[];
		beforeEach(() => {
			genSeq = [];
		});
		describe("Standard behavior", () => {
			test.each([
				["including zero by default", 5, true, [0, 1, 2, 3, 4]],
				["excluding zero when includeZero is false", 5, false, [1, 2, 3, 4, 5]],
				["empty if n is 0 when includeZero is true", 0, true, []],
				["empty if n is 0 when includeZero is false", 0, false, []],
				["single-element when n is 1 and includeZero is true", 1, true, [0]],
				["single-element when n is 1 and includeZero is false", 1, false, [1]],
			] as const)(
			"Generates sequence: %s.",
			(_desc, n, includingZero, expectedSeq) => {
				genSeq = seqℕ(n, includingZero);
				expect(genSeq).toEqual(expectedSeq);
			});
		});
		describe("Edge & coercion cases", () => {
			test.each([
				["Treats negative n as zero (empty sequence) when includingZero is true.", -3, true, []],
				["Treats negative n as zero (empty sequence) when includingZero is false.", -3, false, []],
				["Floors fractional n to integer length when includingZero is true.", 3.7, true, [0, 1, 2]],
				["Floors fractional n to integer length when includingZero is true.", 3.7, false, [1, 2, 3]],
			] as const)(
			"Generates sequence: %s.",
			(_desc, n, includingZero, expectedSeq) => {
				genSeq = seqℕ(n, includingZero);
				expect(genSeq).toEqual(expectedSeq);
			});
		});
	});
	describe("range()", () => {
		let genRange: number[];
		type RangeParams = {
			start: number;
			end: number;
			step: number;
		};
	    let	rangeParams: RangeParams;
		beforeEach(() => {
			genRange = [];
			rangeParams = {
				start: 0,
				end: 0,
				step: 0
			};
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
		});
	});
});
