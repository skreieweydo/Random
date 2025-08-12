import { isFloat } from "../../src/utils";

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
