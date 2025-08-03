import { validateNumber, isFloat, seqℕ, range } from "../src/utils";

describe("Utils", () => {
	describe("validateNumber", () => {
		describe("Valid inputs (should not throw)", () => {   
			test.todo("Accepts a positive integer.");
			test.todo("Accepts a negative float.");
			test.todo("Accepts zero.");
		});
		describe("Invalid inputs (should throw)", () => {
			test.todo("Throws on NaN.");
			test.todo("Throws on Infinity.");
			test.todo("Throws on -Infinity.");
			test.todo("Throws on non-number type.");
			test.todo("Throws on undefined.");
			test.todo("Throws on null.");
			test.todo("Throws on boolean.");
			test.todo("Throws on object.");
			test.todo("Throws on array.");
			test.todo("Throws on function.");
		});
	});
	describe("isFloat()", () => {
		describe("Valid floats (should return true)", () => {
			test.todo("returns true for non-integer finite number");
			test.todo("returns true for negative non-integer finite number");
			test.todo("returns true for very small nonzero float (MIN_VALUE)");
		});

		describe("Non-float numbers (should return false)", () => {
			test.todo("returns false for integer");
			test.todo("returns false for integer-valued float (5.0)");
			test.todo("returns false for zero");
			test.todo("returns false for negative zero");
			test.todo("returns false for NaN");
			test.todo("returns false for +Infinity");
			test.todo("returns false for -Infinity");
		});
	});
	describe("seqℕ()", () => {
		describe("Standard behavior", () => {
			test.todo("generates sequence including zero by default");
			test.todo("generates sequence excluding zero when includeZero is false");
			test.todo("generates empty sequence if n is 0");
			test.todo("generates single-element sequence when n is 1");
		});

		describe("Edge & coercion cases", () => {
			test.todo("treats negative n as zero (empty sequence)");
			test.todo("floors fractional n to integer length");
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
