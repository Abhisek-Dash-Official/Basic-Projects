const choices = document.querySelectorAll(".choices div");
let msg = document.getElementById('msg');
let scoreBoard = document.getElementById('score');
let statusEmojis = document.querySelectorAll("#status .emoji");
let userScore = 0, compScore = 0;

const emojiMap = {
    rock: "✊",
    paper: "🖐️",
    scissors: "✌️"
};

// Update the Status Emojis
const changeStatus = (userChoice, compChoice) => {
    statusEmojis[0].textContent = emojiMap[userChoice];
    statusEmojis[1].textContent = emojiMap[compChoice];
};

// Show Winner Message
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++
        msg.textContent = `🎉 You Win! Your ${userChoice} beats ${compChoice}.`;
        msg.style.backgroundColor = '#4CAF50';
    } else {
        compScore++
        msg.textContent = `💔 You Lost! ${compChoice} beats your ${userChoice}.`;
        msg.style.backgroundColor = '#f44336';
    }
    scoreBoard.textContent = `You: ${userScore} | Comp: ${compScore}`
};

// Main Game Logic
function playGame(userChoice, compChoice) {
    if (userChoice === compChoice) {
        msg.textContent = '😐 Game Draw. Play Again!';
        msg.style.backgroundColor = '#ffc107';
    } else {
        let userWin = true;
        if (userChoice === 'rock') {
            userWin = compChoice === 'paper' ? false : true;
        } else if (userChoice === 'paper') {
            userWin = compChoice === 'scissors' ? false : true;
        } else {
            userWin = compChoice === 'rock' ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

// Click Event Setup
choices.forEach((img) => {
    img.addEventListener("click", () => {
        img.classList.add("spin");

        let userChoice = img.getAttribute('id');
        let compChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
        changeStatus(userChoice, compChoice);
        playGame(userChoice, compChoice);

        setTimeout(() => {
            img.classList.remove("spin");
        }, 600);
    });
});