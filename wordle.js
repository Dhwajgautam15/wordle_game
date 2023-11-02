
const readline = require("readline");
const fs = require("fs").promises;
const chalk = require("chalk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let wordList;
let chances = 6;
let hidden = "";
// let last = "";

async function loadWordList() {
  try {
    const data = await fs.readFile("sgb-words.txt", "utf-8");
    wordList = data.split("\n").map((word) => word.trim());
    // console.log(wordList);
    
  } catch (error) {
    console.error("Error reading the word list:", error);
    process.exit(1);
  }
}

function displayWelcomeMessage(word) {
  console.log(`Hello User, Welcome to ${word.length} letters Wordle Guess Game`);
  console.log("Instructions:");
  console.log("1. If the letter is in the word and in the right spot, it will turn green.");
  console.log("2. If the letter is in the word, but not in the right spot, it will turn yellow.");
  console.log("3. If the letter turns gray, the letter is not in the word at all.");
  console.log(`The word is ${word}`);
}

function displayGameStartMessage(attempts) {
  console.log(`You have ${attempts} attempts to guess the word.`);
}

async function startGame() {
  while (chances > 0) {
    console.log(`Attempts left: ${chances}`);
    const guess = await promptForGuess();

    if (guess === hidden) {
      console.log(`Congratulations! You guessed the word: ${hidden}`);
      rl.close();
      return;
    }

    const feedback = evaluateGuess(hidden, guess);
    displayFeedback(feedback);

    chances--;
  }

  gameOver();
}

async function promptForGuess() {
  let guess;

  do {
    guess = await new Promise((resolve) => rl.question("Guess the word: ", resolve));
    if (guess.length !== hidden.length || !wordList.includes(guess)) {
      console.log("Invalid guess. Try again.");
    }
  } while (guess.length !== hidden.length || !wordList.includes(guess));

  return guess;
}

function evaluateGuess(wordToGuess, guess) {
  const feedback = [];
    // console.log(wordToGuess);
    
  for (let i = 0; i < wordToGuess.length; i++) {
    const guessedLetter = guess[i];
    const isCorrect = guessedLetter === wordToGuess[i];

    feedback.push({
      index: i,
      guessedLetter,
      status: isCorrect ? "green" : "grey",
    });
  }

  for (let i = 0; i < wordToGuess.length; i++) {
    if (feedback[i].status === "grey" && wordToGuess.includes(guess[i])) {
      const correctIndex = wordToGuess.indexOf(guess[i]);
      feedback[i].status = "yellow";
      wordToGuess = wordToGuess.substring(0, correctIndex) + wordToGuess.substring(correctIndex + 1);
    }
  }

  feedback.sort((a, b) => a.index - b.index);

  return feedback;
}

function displayFeedback(feedback) {
  feedback.forEach((item) => {
    console.log(`index: ${item.index}, guessedLetter: ${chalk[item.status](item.guessedLetter)}   status: ${chalk[item.status](item.status)}`);
  });
}

function gameOver() {
  console.log("Game over. You have run out of chances.");
  console.log(`The word was: ${hidden}`);
  rl.close();
}

async function initializeAndStartWordleGame(wordListArray) {
  if (Array.isArray(wordListArray) && wordListArray.length > 0) {
    wordList = wordListArray;
  } else {
    await loadWordList();
  }

  chances = 6;
  hidden = wordList[Math.floor(Math.random() * wordList.length)];

  displayWelcomeMessage(hidden);
  console.log("Press start button to start the game");

  const input = await new Promise((resolve) => rl.question("", resolve));

  if (input === "start") {
    displayGameStartMessage(chances);
    await startGame();
  } else {
    console.log("Invalid input. Please press the start button to start the game.");
    rl.close();
  }
}

initializeAndStartWordleGame();

module.exports = {
  loadWordList,
  promptForGuess,
  evaluateGuess,
  startGame
}
