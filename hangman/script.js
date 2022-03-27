const { log } = console;
 
let userGuess = "  ";
const WIN = "You win";
const LOST = "Want to try your luck again?";

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

const initializeUserGuess = (guessesCount) => {
  let arr = Array(guessesCount);
  for (let i = 0; i < arr.length; i++) {
    log("here");
    arr[i] = "_";
  }
  return arr;
};

 

const drawGameBoard = () => {
  const WORDS = ["Johnny", "Jamerson", "Jeremy", "Anthony"];
  const RANDOM_WORD = WORDS[Math.floor(Math.random() * 4)].toLowerCase();
  log("random ", RANDOM_WORD);
  let guessesCount = RANDOM_WORD.length;
  log('i got called')
  let arr = initializeUserGuess(guessesCount);

  const ALPHABET = buildAlphabetArray();
  drawArrayToScreen(ALPHABET, alphabet, "btn btn-outline-primary alphabet"); //draw the alphabet array to screen
  drawArrayToScreen(arr, wordDiv, "guess");

}


const drawGameOver = (strInput) => {
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

drawGameBoard();
drawGameOver("Game Over")

 
  // let alphabetButtons = document.querySelectorAll(".alphabet");
  // let newUserGuessArray = Array(guesses_count);
  // Array.from(alphabetButtons).map((button) => {
  //   button.addEventListener("click", function (event) {
  //     log(`id:${button.id} is `, button.textContent);       
       
  //     if (RANDOM_WORD.toLowerCase().includes(button.textContent.toLowerCase())) {
  //       console.log(`found a match`)
  //       let index = RANDOM_WORD.indexOf(button.textContent); 
  //       log(`index of matching ${index}`)
         
  //       for(let i = 0; i < userGuessArray; i++){
  //         if (i === index) {
  //           newUserGuessArray[i] = RANDOM_WORD[index];
  //         }
  //         newUserGuessArray[i] = userGuessArray[i];
  //         userGuessArray = newUserGuessArray;
  //       }

        
  //     }
  //   });
  // });
 
 

