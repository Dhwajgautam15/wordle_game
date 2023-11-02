const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs").promises;
const readline = require("readline");


// Import the functions from wordle.js
const {
  loadWordList,
  promptForGuess,
  evaluateGuess,
  startGame,
} = require("./wordle");

describe("Wordle Game", function () {
  // Stub readline interface for testing
  let rlStub;

  beforeEach(function () {
    rlStub = sinon.stub(console, "log");
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it("should evaluate a correct guess correctly", function () {
    const wordToGuess = "apple";
    const guess = "apple";

    const feedback = evaluateGuess(wordToGuess, guess);

    expect(feedback).to.deep.equal([
      { index: 0, guessedLetter: "a", status: "green" },
      { index: 1, guessedLetter: "p", status: "green" },
      { index: 2, guessedLetter: "p", status: "green" },
      { index: 3, guessedLetter: "l", status: "green" },
      { index: 4, guessedLetter: "e", status: "green" },
    ]);
  });

  it("should evaluate an incorrect guess correctly", function () {
    const wordToGuess = "apple";
    const guess = "april";

    const feedback = evaluateGuess(wordToGuess, guess);

    expect(feedback).to.deep.equal([
      { index: 0, guessedLetter: "a", status: "green" },
      { index: 1, guessedLetter: "p", status: "green" },
      { index: 2, guessedLetter: "r", status: "grey" },
      { index: 3, guessedLetter: "i", status: "grey" },
      { index: 4, guessedLetter: "l", status: "yellow" },
    ]);
  });
  
});