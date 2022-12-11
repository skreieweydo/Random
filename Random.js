class Random {
    // "number" and "integer" functions returns are inclusive of max and min
    #minimum;
    #maximum;

    constructor(minimum, maximum) {
	    this.#minimum = minimum;
	    this.#maximum = maximum;
	}

    set minimum(value) {
	    this.#minimum = value;
	}
    get minimum() {
	    return this.#minimum;
	}
    set maximum(value) {
	    this.#maximum = value;
	}
    get maximum() {
	    return this.#maximum;
	}

    get number() {
	    return Math.random() * (this.#maximum - this.#minimum + 1) + this.#minimum;
	}
    get integer() {
	    return Math.floor(this.number);
	}
	get zeroOrOne() {
	    return Math.round(Math.random());
	}
    choice(nums) {
	    this.#minimum = 0;
	    this.#maximum = nums.length - 1;
		
	    return nums[this.integer];
	}
}

exports.Random = Random;
