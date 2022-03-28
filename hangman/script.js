const { log } = console;
 
 
const WIN = "You win";
const LOSS = "Want to try your luck again?";
const WORDS = ["Johnny", "Jamerson", "Jeremy", "Anthony"];
const RANDOM_WORD = WORDS[Math.floor(Math.random() * 4)].toUpperCase();
let guessesCount = RANDOM_WORD.length;
let lives = guessesCount;
let userGuessArray = Array(guessesCount);

let wordDiv = document.querySelector("#word");
let alphabet = document.querySelector("#alphabet");
let divider = document.querySelector("#divider")

const buildAlphabetArray = () => {
  const START_CHAR = 65;
  const END_CHAR = 91;
  const ALPHABET = Array(26);
  for (let i = START_CHAR; i < END_CHAR; i++) {
    ALPHABET[i] = String.fromCharCode(i);
  }
  return ALPHABET;
};

const drawArrayToScreen = (inputArray, element, strClassName) => {
  inputArray.map((character, index) => {
    let button = document.createElement("button");
    button.className = strClassName;
    button.id = `${index}`;
    button.innerHTML = ``;
    button.innerHTML = `${character}`;
    element.appendChild(button);
  });
};

const initializeUserGuess = () => {   
  for (let i = 0; i < userGuessArray.length; i++) {
    userGuessArray[i] = "_";  }
  
  return userGuessArray;
};

 

const drawGameBoard = () => {   
  log("drawing Gameboard-RandomWord is: ", RANDOM_WORD);
   
  userGuessArray = initializeUserGuess();
  const ALPHABET = buildAlphabetArray();
  drawArrayToScreen(ALPHABET, alphabet, "btn btn-outline-primary alphabet"); //draw the alphabet array to screen
  drawArrayToScreen(userGuessArray, wordDiv, "guess");
}


const drawGameOver = (strInput) => {
  log('drawing GameOver')
  const bodyElement = document.querySelector("#BodyElement");
  bodyElement.className = "flex-center-column";

  alphabet.classList.toggle('none');
  wordDiv.classList.toggle('none');
  divider.classList.toggle('none');
   
  let newDiv = document.createElement("h1");
  newDiv.innerHTML = "Game Over";

  let button = document.createElement("button");
  button.id = "playAgain";   
  button.innerHTML = "Play Again";

  
  bodyElement.appendChild(newDiv);
  bodyElement.appendChild(button)

  const playAgain = document.querySelector("#playAgain");

  playAgain.addEventListener("click", function(event) {
    console.log("playAgain clicked"); //now draw the game board
    bodyElement.removeChild(newDiv);
    bodyElement.removeChild(playAgain);
    alphabet.classList.toggle("none");
    wordDiv.classList.toggle("none");
    divider.classList.toggle("none");
    drawGameBoard();
  }) 
}

const updateUserGuessArray = (charToBeFound) => {
  for (let i = 0; i < RANDOM_WORD.length; i++) {
    if (RANDOM_WORD[i] === charToBeFound) {
      userGuessArray[i] = charToBeFound;
    }
  }
}
 

drawGameBoard();
//drawGameOver("Game Over")


let alphabetButtons = document.querySelectorAll(".alphabet");
Array.from(alphabetButtons).map((button) => {
  button.addEventListener("click", function(event) {    
    log(`id:${button.id} is `, button.textContent); 
    if (RANDOM_WORD.includes(button.textContent))
    {
      log('found match')
      updateUserGuessArray(button.textContent);
      wordDiv.innerHTML = ""
      drawArrayToScreen(userGuessArray, wordDiv, "guess");
    }
    else {
      lives--;
    }
  })
})

 
 

 
 

