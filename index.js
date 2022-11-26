const { Random } = require("./Random");

const random = new Random(0, 4);

const randNum = random.num;
const randInt = random.int;
const zeroOrOne = random.zeroOrOne;

let nums = [2, 4];
const randChoice = random.choice(nums);

console.log(`A random number from 0 to 1: ${randNum}.`);
console.log(`A random integer from ${random.minimum} to ${random.maximum}: ${randInt}.`);
console.log(`A random instance of either the numbers zero or one: ${zeroOrOne}.`);
console.log(`A random element of ${nums}: ${randChoice}.`);

nums = [2, 4, 6];
console.log(`A random element of ${nums}: ${randChoice}.`);
