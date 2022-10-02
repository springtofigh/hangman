// RANDOM WORDS
const secretPhrases = ["never" , "you" , "that", "bullet" , "break" , "mother" , "python" , "hello" , "cat"];

// VARIABLES
let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;

// SHOOSE RANDOM ITEM
function selectRandomItem() {
    // MAKE RANDOM NUMBER FOR CHOSSING RANDOM WORD
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    document.getElementById("letters").addEventListener("click" , buttonHandler);
    window.addEventListener("keydown" , keyHandler);
}

// MAKE UNDER SCORES EQUAL TO RANDOM WORD
function setUnderScore() {
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map(letter => (clicked.indexOf(letter) >= 0 ? letter : "_"))
    result = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`
}

// IF USER WON
function checkIfwon() {
    if (randomItem === result) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "./assets/winner.png";
    }
}

// IF USER LOST
function checkIflost() {
    if (mistakes === 6) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("clue").innerHTML = `<p>Random word is: ${randomItem}</p>`
    }
}

// UPDATE PICTURES
function updateHangmanPicture() {
    const image = document.getElementById("image").querySelector("img");
    image.src = `./assets/hangman${mistakes}.png`
}

//  CHECK BETWEEN USER LETTER AND LETTER IN SECRET PHRASE
function letterHandler(Letter) {
    Letter = Letter.toLowerCase();
    clicked.indexOf(Letter) === -1 ? clicked.push(Letter) : null;
    document.getElementById(Letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(Letter) >= 0) {
        setUnderScore();
        checkIfwon();
} else if (randomItem.indexOf(Letter) === -1) {
        mistakes++;
        checkIflost();
        updateHangmanPicture()
    }
}

//CHOOSE LETTERS IN PAGE
function buttonHandler(event) {
    letterHandler(event.target.id)
}

//  CHOOSE LETTERS WITH USER KEYBOARD
function keyHandler(event) {
    letterHandler(event.key)
}

selectRandomItem();
setUnderScore();
