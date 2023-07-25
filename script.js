const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application','programming','interface','wizard',
"apple", "banana", "orange", "grape", "kiwi", "mango", "peach", "pear", "watermelon", "strawberry",
"tiger", "lion", "elephant", "giraffe", "zebra", "panda", "kangaroo", "koala", "bear", "wolf",
"india", "france", "japan", "brazil", "australia", "canada", "germany", "italy", "spain", "mexico",
"python", "java", "javascript", "csharp", "html", "css", "php", "ruby", "swift", "sql",
"apricot", "blueberry", "cherry", "fig", "guava", "lemon", "lime", "nectarine", "papaya", "plum",
"cheetah", "penguin", "rhinoceros", "hedgehog", "hippopotamus", "crocodile", "parrot", "squirrel", "peacock", "dolphin",
"china", "usa", "russia", "indonesia", "southkorea", "egypt", "turkey", "thailand", "argentina", "netherlands", "cplusplus", "swift", "perl", "scala", "javascript", "html", "css", "mysql", "mongodb",
"blackberry", "raspberry", "strawberry", "kiwifruit", "blueberry", "apricot", "grapefruit", "mango", "passionfruit", "pineapple",
"crocodile", "flamingo", "gorilla", "jaguar", "leopard", "octopus", "panther", "snail", "toucan", "whale",
"brazil", "china", "egypt", "germany", "ireland", "jamaica", "nepal", "oman", "qatar", "russia",
"django", "react", "angular", "vue", "node", "flask", "laravel", "spring", "express", "symfony"];
let selectedWord = words[Math.floor(Math.random()*words.length)];
let playable = true;
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
            )
            .join('')}
    `;
    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

    if (innerWord === selectedWord) {
        endGame('Congratulations! You won! 😃');
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length >0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    figureParts.forEach((part,index) =>{
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        endGame('Unfortunately you lost. 😕');
    }
}

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Function to handle the end of the game (both win and lose scenarios)
function endGame(message) {
    finalMessage.innerText = message;
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = 'flex';
    playable = false;
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLettersEl();
                } else {
                    showNotification();
                }
            }
        }
    }
});

// Function to reset the game and handle the click event on 'Play Again' button
function playAgainButtonClick() {
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
}

// Attach the 'playAgainButtonClick' function to the 'click' event of the 'playAgainBtn'
playAgainBtn.addEventListener('click', playAgainButtonClick);

// Function to handle Enter key press when the popup is shown
function handleEnterKeyPress(event) {
    if (event.keyCode === 13 && !playable) {
        playAgainBtn.click();
    }
}

// Add an event listener for keypress on the document
document.addEventListener('keydown', handleEnterKeyPress);

displayWord();
