const fs = require("fs");
const readline = require("readline-sync");

const filepath = "sgb-words.txt"

function readTxtFile(file){
    const data = fs.readFileSync(file,'utf8');

    return data.split('\n').map(word => word.trim());
}

function getRandomWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}


function userInput(){
    const userInput = readline.question('please enter your word:');
    return userInput;

}

function userInputAgain(){
    const userInputAgain = readline.question('enter 1 to start game : enter 0 to end the game');
    return userInputAgain;

}

function guessLetter(input, random){
    for(i=0;i<5;i++){
        if(random[i] == input[i]){
            console.log(`index ${i} : right place`); 
        }
        else if(random.includes(input[i])){
            console.log(`index ${i} : letter present but at wrong place`);
            
        }
        else{
            console.log(`index ${i} : letter is not present`);
            
        }
    }

}

function gameWordle(wordle){

    let newGame = 1;
   
    while(newGame){
        let i = 0;
        const random = getRandomWord(wordle);
        console.log(random);
        while(i<6){
            const input = userInput()
            if(input === random){
                console.log(`You Win : word is ${random}`);  
                break;         
            }
            else if(!wordle.includes(input)){
                console.log("word not present in list");
                continue;
                
            }
            else{
                guessLetter(input,random);
            }
            i++;
       
        }
    
        if(i==6){
            console.log("you Lost ");
            
        }
        // console.log("To play again :: press 1");
    
        const playAgain = userInputAgain()
        if(playAgain == 0){
            newGame = 0;
            console.log("press 1 to start : enter 0 to end game");
            
        }
        else{
            console.log("new Game Enjoy !!");
            
        }
    }


    

}


function main(){
    const wordle = readTxtFile(filepath)
    console.log(wordle);
    
    // const randomWord = getRandomWord(wordle);
    // console.log(randomWord);
    

    gameWordle(wordle);
}

main()