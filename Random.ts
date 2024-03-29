class Random {
    // "number" and "integer" functions returns are inclusive of max and min
    private minimum: number;
    private maximum: number;

    constructor(minimum:number = -1, maximum: number = -1) {
	    this.minimum = minimum;
	    this.maximum = maximum;
	}

    set min(value: number) {
	    this.minimum = value;
	}
    get min(): number{
	    return this.minimum;
	}
    set max(value: number) {
	    this.maximum = value;
	}
    get max(): number {
	    return this.maximum;
	}

    get number(): number {
		return Math.random() * (this.maximum - this.minimum + 1) + this.minimum;
	}
    get integer(): number {
		return Math.floor(this.number);
	}
	get zeroOrOne(): number {
	    return Math.round(Math.random());
	}
    choice(nums: number[]): number {
	    this.minimum = 0;
	    this.maximum = nums.length - 1;
		
	    return nums[this.integer];
	}
	static populate(n: number, start: number = 0, end: number = 100, frac: boolean = false): number[] {
	   return Array.from({length: n}, _ => {
		  let randNum = new Random(start, end).integer;
		  if(frac) return randNum /= end;
		  return randNum;
	   });
	}
}

exports.Random = Random;
