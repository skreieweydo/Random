import { validateNumber } from "../../src/utils/index";

describe("validateNumber", () => {
	let valObj: {
		label: string;
		value: number | typeof NaN;
	};
	beforeEach(() => {
		valObj = { label: "Test", value: 0 };
	});
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
