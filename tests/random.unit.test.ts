import { Random } from "../src/Random";

describe("Random Number Generator", () => {
	let random: Random;

	beforeEach(() => {
		random = new Random(0, 10);
	});

	describe("Initialization and Construction", () => {
		test.todo("Creates instance with valid min and max.");
		test.todo("Throws error if min > max during during construction.");
	});

	describe("Min/Max Configuration via Setters", () => {
		test.todo("Correctly updates min and max values.");
		test.todo("Throws error when min > max using setter.");
		test.todo("Throws error when max < min using setter.");
	});

	describe("Random Value Generation", () => {
		test.todo("randomNumber returns float in [min, max).");
		test.todo("randomInteger returns integer in [min, max].");
		test.todo("zeroOrOne returns either 0 or 1.");
	});

	describe("Random Selection from Arrays", () => {
		test.todo("choice() selects an element from array.");
		test.todo("choice() throws on empty array.");
	});

	describe("Static Method: populate()", () => {
		test.todo("Creates array of specified length.");
		test.todo("Produces values within [start, end] range.");
		test.todo("Supports fractional mode with values in [0, 1].");
		test.todo("Throws error for zero or negative length.");
	});
});
