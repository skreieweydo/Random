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
		let expectedSeq: number[];
		beforeEach(() => {
			genSeq = [];
			expectedSeq = [];
		});
		describe("Standard behavior", () => {
			test("Generates sequence including zero by default.", () => {
				genSeq = seqℕ(5);
				expectedSeq = [0, 1, 2, 3, 4];
				expect(genSeq).toEqual(expectedSeq);
			});
			test("Generates sequence excluding zero when includeZero is false.", () => {
				genSeq = seqℕ(5, false);
				expectedSeq = [1, 2, 3, 4, 5];
				expect(genSeq).toEqual(expectedSeq);
			});
			test("Generates empty sequence if n is 0.", () => {
				genSeq = seqℕ(0);
				expectedSeq = [];
				expect(genSeq).toEqual(expectedSeq);

				genSeq = seqℕ(0, false);
				expect(genSeq).toEqual(expectedSeq);
			});
			test("Generates single-element sequence when n is 1.", () => {
				genSeq = seqℕ(1);
				expectedSeq = [0];
				expect(genSeq).toEqual(expectedSeq);

				genSeq = seqℕ(1, false);
				expectedSeq = [1];
				expect(genSeq).toEqual(expectedSeq);
			});
		});
		describe("Edge & coercion cases", () => {
			test("Treats negative n as zero (empty sequence).", () => {
				genSeq = seqℕ(-3);
				expectedSeq = [];
				expect(genSeq).toEqual(expectedSeq);

				genSeq = seqℕ(-3, false);
				expectedSeq = [];
				expect(genSeq).toEqual(expectedSeq);
			});
			test("Floors fractional n to integer length.", () => {
				// e.g. 3.7 → floor(3.7) = 3
				genSeq = seqℕ(3.7);
				expectedSeq = [0, 1, 2];
				expect(genSeq).toEqual(expectedSeq);

				genSeq = seqℕ(3.7, false);
				expectedSeq = [1, 2, 3];
				expect(genSeq).toEqual(expectedSeq);
			});
		});
	});
	describe("range()", () => {
		describe("Standard ranges (should return correct arrays)", () => {
			test.todo("generates correct range with step 1");
			test.todo("generates correct range with custom step");
			test.todo("handles non-integer span lengths");
			test.todo("generates empty array if start ≥ stop");
		});

		describe("Edge & advanced ranges (should handle edge cases)", () => {
			test.todo("generates correct range for negative start");
			test.todo("generates correct range with fractional step");
			test.todo("generates single-element array if step > span");
			test.todo("generates decreasing range with negative step");
			test.todo("throws when step is zero");
		});
	});
});
