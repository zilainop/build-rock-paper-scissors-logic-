// Select all necessary elements
const playerchoice = document.querySelector(".playerchoice");
const playerscore = document.querySelector(".playerscore");

const cpchoice = document.querySelector(".cpchoice");
const cpscore = document.querySelector(".cpscore");

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

const displayMessage = document.querySelector(".para");
const nextRound = document.querySelector(".nextround");

// Initialize score variables
let playerScoreValue = 0;
let computerScoreValue = 0;

// Function to randomly return "Rock", "Paper", or "Scissors" for the computer
function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// This function checks who won the round
function checkWinner(player, computer) {
    // If both choices are the same
    if (player === computer) {
        displayMessage.textContent = "It's a tie!";
        displayMessage.style.backgroundColor = "yellow";

        return "tie";
    }

    // Winning combinations for player
    if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")
    ) {
        displayMessage.textContent = "🎉 You win this round! +10 points";
        displayMessage.style.backgroundColor = "rgb(61, 255, 7)";
        return "player";
    }

    // If not a tie and not a player win, it's a computer win
    displayMessage.textContent = "😔 Computer wins this round! +10 points";
    displayMessage.style.backgroundColor = "red";
    return "computer";
}

// Update scores in the HTML
function updateScores() {
    playerscore.textContent = `Player Score: ${playerScoreValue}`;
    cpscore.textContent = `Computer Score: ${computerScoreValue}`;
}

// Function to reset the game (scores and messages)
function resetGame() {
    playerScoreValue = 0;
    computerScoreValue = 0;
    updateScores();
    displayMessage.textContent = "Game restarted. Make your choice!";
    playerchoice.textContent = "";
    playerchoice.style.backgroundColor = "yellow";
    cpchoice.textContent = "";
    cpchoice.style.backgroundColor = "rgb(9, 195, 247)";
}

// This function handles playing one round
function playRound(playerSelection) {
    const computerSelection = getComputerChoice();

    // Update UI with both choices
    playerchoice.textContent = playerSelection;
    cpchoice.textContent = computerSelection;

    // Determine the winner
    const winner = checkWinner(playerSelection, computerSelection);

    // Update score based on who won
    if (winner === "player") {
        playerScoreValue += 10;
    } else if (winner === "computer") {
        computerScoreValue += 10;
    }

    // Update score display
    updateScores();

    // Check for game over
    if (playerScoreValue >= 100) {
        displayMessage.textContent = "🏆 Congratulations! You reached 100 points and won the game!";
        disableButtons(); // Disable buttons until "Next Round"
    } else if (computerScoreValue >= 100) {
        displayMessage.textContent = "💀 The computer reached 100 points. You lost the game.";
        disableButtons(); // Disable buttons until "Next Round"
    }
}

// Disable game buttons after someone wins
function disableButtons() {
    rock.disabled = true;
    paper.disabled = true;
    scissors.disabled = true;
}

// Enable buttons for a new game
function enableButtons() {
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;
}

// Add event listeners to game buttons
rock.addEventListener("click", () => playRound("Rock"));
paper.addEventListener("click", () => playRound("Paper"));
scissors.addEventListener("click", () => playRound("Scissors"));

// Event listener for "Next Round" button to restart the game
nextRound.addEventListener("click", () => {
    resetGame();    // Reset score and messages
    enableButtons(); // Re-enable game buttons
});

