const { Random } = require("./Random");

const random = new Random(0, 9);

let randNum = random.number;
console.log(`A random number from ${random.minimum} to ${random.maximum}: ${randNum}.`);

let randInt = random.integer;
console.log(`A random integer from ${random.minimum} to ${random.maximum}: ${randInt}.`);

const zeroOrOne = random.zeroOrOne;
console.log(`A random instance of either the numbers zero or one: ${zeroOrOne}.`);

let nums = [2, 4];
const randChoice = random.choice(nums);

console.log(`A random element of ${nums}: ${randChoice}.`);
console.log(`minimum: ${random.minimum} and maximum: ${random.maximum}`);

nums = [2, 4, 6];
console.log(`A random element of ${nums}: ${randChoice}.`);
console.log(`minimum: ${random.minimum} and maximum: ${random.maximum}`);

random.minimum = 0;
random.maximum = 9;

randNum = random.number;
console.log(`A random number from ${random.minimum} to ${random.maximum}: ${randNum}.`);

randInt = random.integer;
console.log(`A random integer from ${random.minimum} to ${random.maximum}: ${randInt}.`);
