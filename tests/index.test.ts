const { Random } = require("../Random");

describe("Random Number Generator", () => {
   const minimum: number = 0;
   const maximum: number = 9;
   const random = new Random(minimum, maximum);

   test.todo("The minimum possible generated random number.")
   test.todo("The maximum possible generated random number.")
   test(`A random number greater than ${random.min}.`, () => { 
	  const randNum: number = random.number;
	  expect(randNum).toBeGreaterThanOrEqual(random.min);
   });
   test(`A random number less than ${random.max}.`, () => {
	  const randNum: number = random.number;
	  expect(randNum).toBeLessThanOrEqual(random.max);
   });
   test(`A random integer greater than ${random.min}.`, () => {
	  const randInt: number = random.integer;
	  expect(randInt).toBeGreaterThanOrEqual(random.min);
   });
   test(`A random integer less than ${random.max}.`, () => { 
	  const randInt: number = random.integer;
	  expect(randInt).toBeGreaterThanOrEqual(random.min);
   });
   test("A random value of either zero or one.", () => {
	  const zeroOrOneArr: number[] = [0, 1];
	  const zeroOrOne: number = random.zeroOrOne;
	  expect(zeroOrOneArr).toContain(zeroOrOne);
   });
   test("An entry of an array at a random index.", () => {
	  const numsArr: number[] = [2, 4, 6];
	  const randChoice: number = random.choice(numsArr);
      expect(numsArr).toContain(randChoice);
   });
   test.todo("An array populated by randomly generated numbers.");
});
