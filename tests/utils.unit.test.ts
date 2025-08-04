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
			test("Accepts a positive integer.", () => {
				valObj.value = 123;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).not.toThrow();
			});
			test("Accepts a negative float.", () => {
				valObj.value = -4.56;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).not.toThrow();
			});
			test("Accepts zero.", () => {
				valObj.value = 0;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).not.toThrow();
			});
		});
		describe("Invalid inputs (should throw)", () => {
			let errorStr: string;
			beforeEach(() => {
				errorStr = "";
				errorStr = "Test must be a valid number.";
			});
			test("Throws on NaN.", () => {
				valObj.value = NaN;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on Infinity.", () => {
				valObj.value = Infinity;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on -Infinity.", () => {
				valObj.value = -Infinity;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on non-number type.", () => {
				valObj.value = "string" as unknown as number;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on undefined.", () => {
				valObj.value = undefined as any;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on null.", () => {
				valObj.value = null as any;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on boolean.", () => {
				valObj.value = true as any;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on object.", () => {
				valObj.value = {} as any;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on array.", () => {
				valObj.value = [1, 2] as any;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
			test("Throws on function.", () => {
				valObj.value = (() => 3) as any;
				const { label, value } = valObj;
				errR = () => validateNumber(label, value);
				expect(errR).toThrow(errorStr);
			});
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
