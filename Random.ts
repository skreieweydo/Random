export class Random {
    // "number" and "integer" functions returns are inclusive of max and min
    private minimum: number;
    private maximum: number;

	// Math.random():m [0, 1)
	// default: (0, 1)
    constructor(minimum:number = 0, maximum: number = 1) {
		if (minimum > maximum) {
            throw new Error("Minimum cannot be greater than maximum.");
        }
	    this.minimum = minimum;
	    this.maximum = maximum;
	}
    // Accessors for min and max with validation
    set min(value: number) {
        if (value > this.maximum) {
            throw new Error("Minimum cannot be greater than maximum.");
        }
	    this.minimum = value;
	}
    get min(): number {
	    return this.minimum;
	}
	set max(value: number) {
		if (value < this.minimum) {
            throw new Error("Maximum cannot be less than minimum.");
        }
        this.maximum = value;
	}
    get max(): number {
	    return this.maximum;
	}
	// The number and integer methods are designed to return values inclusive of the maximum and minimum. However, the way the random number is generated can lead to confusion. The Math.random() function generates a number in the range [0, 1), so the formula should be adjusted to ensure inclusivity.
	
	// Methods (not accessors) for random generation
    randomNumber(): number {
		return Math.random() * (this.maximum - this.minimum) + this.minimum;
	}
    randomInteger(): number {
		return Math.floor(this.randomNumber());
	}
	zeroOrOne(): number {
	    return Math.round(Math.random());
	}
	// modifies the state of the Random instance by changing minimum and maximum. This could lead to unintended side effects if the same instance is reused. Consider creating a new instance or resetting the state after the choice is made.
    choice(nums: number[]): number {
        if (nums.length === 0) {
            throw new Error("Array cannot be empty.");
        }
		const indexGen = new Random(0, nums.length - 1);
        return nums[indexGen.randomInteger()];
	}
	// creates a new Random instance for each random number generated. This is inefficient. Instead, consider creating a single instance and reusing it.
	static populate(n: number, start: number = 0, end: number = 100, frac: boolean = false): number[] {
		if (n <= 0) {
            throw new Error("Count must be a positive number.");
        }
	    const generator = new Random(start, end);
	    return Array.from({length: n}, _ => {
		   const randNum = generator.randomInteger();
		   return frac ? randNum / end : randNum;
	    });
	}
}
