const fs = require("fs");
const readline = require("readline-sync");

const filepath = "sgb-words.txt"

function readTxtFile(file) {
    const data = fs.readFileSync(file, 'utf8');

    return data.split('\n').map(word => word.trim());
}

function getRandomWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];

}


function userInput() {
    const userInput = readline.question('please enter your word:');
    return userInput;

}

function userInputAgain() {
    const userInputAgain = readline.question('enter 1 to start game : enter 0 to end the game');
    return userInputAgain;

}

function guessLetter(input, random) {
    const obj = {};

    for (let i = 0; i < random.length; i++) {
        if (obj[random[i]] == undefined) {
            obj[random[i]] = 1;
        } else {
            obj[random[i]]++;
        }
    }
    for (let i = 0; i < input.length; i++) {
        if (obj[input[i]]) {
            if (random[i] == input[i]) {
                console.log(`index ${i} : \x1b[32m${input[i]}\x1b[0m`); // green
                if (obj[input[i]] > 1) {
                    obj[input[i]]--
                } else {
                    delete obj[input[i]]
                }
            } else {
                console.log(`index ${i} : \x1b[34m${input[i]}\x1b[0m`); // blue
                if (obj[input[i]] > 1) {
                    obj[input[i]]--
                } else {
                    delete obj[input[i]]
                }
            }
        } else {
            console.log(`index ${i} : \x1b[31m${input[i]}\x1b[0m`); // red
        }
    }
}




function gameWordle(wordle) {

    let newGame = 1;

    while (newGame) {
        let i = 0;
        const random = getRandomWord(wordle);
        console.log(random);
        while (i < 6) {
            const input = userInput()
            if (input === random) {
                console.log(`You Win : word is ${random}`);
                break;
            }
            else if (!wordle.includes(input)) {
                console.log("word not present in list");
                continue;

            }
            else {
                guessLetter(input, random);
            }
            i++;

        }

        if (i == 6) {
            console.log("you Lost ");

        }
        // console.log("To play again :: press 1");

        const playAgain = userInputAgain()
        if (playAgain == 0) {
            newGame = 0;
            // console.log("press 1 to start : enter 0 to end game");

        }
        else {
            console.log("new Game Enjoy !!");

        }
    }




}


function main() {
    const wordle = readTxtFile(filepath)
    console.log(wordle);

    // const randomWord = getRandomWord(wordle);
    // console.log(randomWord);


    gameWordle(wordle);
}

main()