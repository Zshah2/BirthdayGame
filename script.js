const emojis = [
    '❤️', '❤️', // Heart
    '💖', '💖', // Sparkling Heart
    '💘', '💘', // Heart with Arrow
    '💝', '💝', // Heart with Ribbon
    '💞', '💞', // Revolving Hearts
    '💓', '💓', // Beating Heart
    '💗', '💗', // Growing Heart
    '💟', '💟', // Heart Decoration
    '💕', '💕', // Two Hearts
    '💌', '💌', // Love Letter
];

let cardElements = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0; // Total matched cards
let attempts = 0; // Initialize attempts counter

const gameContainer = document.getElementById('game-container');
const messageContainer = document.createElement('div');
messageContainer.classList.add('message');
document.body.appendChild(messageContainer); // Append message container to the body

const attemptsDisplay = document.createElement('div'); // Create attempts display
attemptsDisplay.classList.add('attempts');
document.body.insertBefore(attemptsDisplay, gameContainer); // Insert attempts display above the game container

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = emoji;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    attempts++; // Increment attempts on each flip
    attemptsDisplay.textContent = `Attempts: ${attempts}`; // Update attempts display

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards += 2; // Increment matched cards by 2 for each successful match
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];

    // Check if all cards are matched
    if (matchedCards === emojis.length) {
        showCompletionMessage(); // Show message when all cards are matched
    }
}

function showCompletionMessage() {
    messageContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You matched all the emojis! 🎉</p>
        <p>It took you ${attempts} attempts.</p> <!-- Show attempts in the message -->
        <p>Happy 19th Birthday! 🎂🥳</p>
        <p>May your day be filled with joy, love, and all your favorite things!</p>
        <p>Wishing you a year ahead that's as bright and beautiful as you are!</p>
        <p>Here's to another amazing year of growth, laughter, and adventure!</p>
        <button id="play-again">Play Again</button>
    `;
    messageContainer.style.display = 'block'; // Show the message container

    // Add event listener to the play again button
    const playAgainButton = document.getElementById('play-again');
    playAgainButton.addEventListener('click', startGame);
}

function startGame() {
    matchedCards = 0; // Reset matched cards count
    attempts = 0; // Reset attempts count
    attemptsDisplay.textContent = `Attempts: ${attempts}`; // Reset attempts display
    gameContainer.innerHTML = '';
    messageContainer.style.display = 'none'; // Hide the message at the start of the game
    shuffle(emojis);
    emojis.forEach(emoji => {
        const card = createCard(emoji);
        gameContainer.appendChild(card);
        cardElements.push(card);
    });
}

// Start the game when the page loads
startGame();