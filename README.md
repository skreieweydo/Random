# Random

> A lightweight TypeScript/JavaScript library for flexible, validated random number generation.

[![npm version](https://img.shields.io/npm/v/@your-org/random)](https://www.npmjs.com/package/@your-org/random)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-org/random/ci.yml)](https://github.com/your-org/random/actions)  
[![License: MIT](https://img.shields.io/npm/l/@your-org/random)](LICENSE)

---

## 📖 Table of Contents

- [Introduction](#introduction)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API](#api)  
- [Testing](#testing)  
- [Roadmap](#roadmap)  
- [Contributing](#contributing)  
- [License](#license)  

---

## 💡 Introduction

The Random library is a thin wrapper over JavaScript’s built-in `Math.random()`, providing:

- Configurable integer and floating-point ranges  
- Seed-agnostic, reusable RNG instance  
- Utility methods like `choice()` and `populate()`  
- Centralized input validation to catch invalid ranges

It helps you write DRY, encapsulated code when you need randomized values in your apps.

---

## 🚀 Installation

```bash
npm install @your-org/random
# or
yarn add @your-org/random
````

---

## 🎯 Usage

```ts
import { Random } from "@your-org/random";

// Create a generator between 0 and 9
const rng = new Random(0, 9);

// Floating-point in [0, 9)
console.log(rng.randomNumber());

// Integer in [0, 9]
console.log(rng.randomInteger());

// Random boolean as 0 or 1
console.log(rng.zeroOrOne());

// Pick a random element
console.log(rng.choice([2, 4, 6]));

// Populate an array of 5 integers in [0, 100] (default)
console.log(Random.populate(5));

// Populate an array of 5 floats in [10, 20]
console.log(Random.populate(5, 10, 20, true));
```

---

## 🧩 API

### `new Random(min?: number, max?: number)`

* **min**: *number* — inclusive lower bound (default: `0`)
* **max**: *number* — inclusive upper bound for integers, exclusive for floats (default: `1`)

#### Instance Methods

| Method                | Signature                                                                    | Description                                                                                   |
| --------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `randomNumber()`      | `() => number`                                                               | Uniform float in `[min, max)`                                                                 |
| `randomInteger()`     | `() => number`                                                               | Uniform integer in `[min, max]`                                                               |
| `zeroOrOne()`         | `() => 0 \| 1`                                                               | Random choice of `0` or `1`                                                                   |
| `choice<T>(arr: T[])` | `(arr: T[]) => T`                                                            | Random element from an array                                                                  |
| `static populate()`   | `(n: number, start?: number, end?: number, frac?: boolean) => number[]`<br/> | Generates an array of length `n` with random values in `[start, end]`, floats if `frac=true`. |

---

## 🧪 Testing

```bash
# Run the tests
npm test

# View coverage report
npm run coverage
```

---

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for future phases, including seedable PRNG, distributions, CSPRNG support, and more.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add something'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE\_OF\_CONDUCT.md](./CODE_OF_CONDUCT.md) first.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

```

Feel free to adjust package names, badges URLs, or sections (e.g., add CLI usage or a “Contact” section) as needed.
```
