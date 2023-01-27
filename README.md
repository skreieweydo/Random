# Random
A wrapper class that implements JavaScript Math.random() function, which provides approximately uniform distribution over the range of numbers between 0 to 1. As specified in the algorithm, no seed can be chosen or reset by the user; it is set initially by the algorithm. The wrapper class helps the user perform various scalings and manipulations on the number generated.

## Table Of Contents
* [General Info](#general-info)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)

## General Info

This project was developed to generate Random numbers under the given conditions that are not available in JavaScript by default. Need was found to repeatedly write and rewrite many of these functions to do work with various projects, so in order to follow the principles of encapsulation and writing code as DRYly as possible, the Random class was found to be clearly necessary.

## Technologies Used

This project is built using es6 class structures, defining a private, as well as JavaScript can do so, range of values within which the numbers can be randomly generated.

## Features

The functions implemented by the wrapper class allow the user to generate either a random numbers between specified values.
* The specified values are two integers specified by the user.
* The user can generate a uniformly distributed number between those specified values.
* The user can generate a uniformly distributed integer betweem those specified values.
* The user can choose a random element of a given array.

## Setup

Setting up the project involves first importing, in the case of using the class in a browser-based project, or requiring it, in the case of a node-based project. Then, we create a Random object by instantiating the class with values that specify the minimum and maximum integers within which the random numbers will be generated.
```
const random = new Random(0, 9);
```
Here, we have created a Random object with a minimum set to 0 and a maximum set to 9.

## Usage

Once a Random object is instantiated, we can generate a random value between the minimum and maximum integers that we specified above. In the examples below, the code yields either a number or an integer between these values.

```
let randNum = random.number;
console.log(`A random number from ${random.minimum} to ${random.maximum}: ${randNum}.`);

let randInt = random.integer;
console.log(`A random integer from ${random.minimum} to ${random.maximum}: ${randInt}.`);
```
Additionally, we can get a randomly generated zero or one; as in the code show below, we get just that.

```
const zeroOrOne = random.zeroOrOne;
console.log(`A random instance of either the numbers zero or one: ${zeroOrOne}.`);
```
Furthermore, given a an array, we can be given a random element of that array yielded through the code below.

```
let nums = [2, 4];
const randChoice = random.choice(nums);
```

## Project Status

This project is completed as long as nothing else can be found to be included in the project to improve the original intention of the project. So, until another sort of random generation can be found, nothing else will be added to the project.

## Room for Improvement

There is room for improvement in that the class structures available in javascript work fine for the project currently entails. However, rewriting the project for typescript can only improve the project as the class structures available there are improved over those available in JavaScript.

## Contact
Feel free to contact me @micrjamesjr on twitter or on github @micrjames
