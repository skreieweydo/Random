const { Random } = require("../Random");

describe("Random Number Generator", () => {
   const random = new Random(0, 9);
   const minimum: number = random.min;
   const maximum: number = random.max;
   test(`A random number from ${minimum} to ${maximum}.`, () => { 
	  const randNum: number = random.number;
	  expect(randNum).toBeGreaterThanOrEqual(minimum);
	  expect(randNum).toBeLessThanOrEqual(maximum);
   });
   test(`A random integer from ${minimum} to ${maximum}.`, () => {
	  const randInt: number = random.integer;
	  expect(randInt).toBeGreaterThanOrEqual(minimum);
	  expect(randInt).toBeLessThanOrEqual(maximum);
   });
   test("A random value of either zero or one.", () => {
	  const zeroOrOneArr: number[] = [0, 1];
	  const zeroOrOne: number = random.zeroOrOne;
	  // expect(OneOf(zeroOrOneArr, zeroOrOne)).toBeTruthy();
	  expect(zeroOrOneArr).toContain(zeroOrOne);
   });
   test("An entry of an array at a random index.", () => {
	  const numsArr: number[] = [2, 4, 6];
	  const randChoice: number = random.choice(numsArr);
      expect(numsArr).toContain(randChoice);
   });
});
