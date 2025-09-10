import { seqℕ } from "../../src/utils/index";

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
			genSeq = seqℕ(n, { includeZero: includingZero });
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
			genSeq = seqℕ(n, {includeZero: includingZero });
			expect(genSeq).toEqual(expectedSeq);
		});
	});
	describe("invalid inputs", () => {
	  test.each([
		["NaN",      NaN],
		["Infinity", Infinity],
		["-Infinity", -Infinity],
		["not a number", "foo" as any],
	  ] as const)(
		"%s → throws",
		(_desc, badN) => {
		  expect(() => seqℕ(badN)).toThrow(
			`seqℕ: 'n' must be a finite number. Received: ${badN}.`
		  );
		}
	  );
	});

});
