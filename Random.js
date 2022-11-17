class Random {
    #num;
    #minimum;
    #maximum;

    constructor(minimum, maximum) {
	    this.#minimum = minimum;
	    this.#maximum = maximum;
	}

    get num() {
	    this.#num = Math.random();
	    return this.#num;
	}
    get int() {
	    this.#num = Math.floor(Math.random() * (this.#maximum - this.#minimum + 1)) + this.#minimum;
	    return this.#num;
	}
	get zeroOrOne() {
	    this.#num = Math.round(Math.random());
	    return this.#num;
	}
}
