const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = Array(9).fill(null);
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Handle player move
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (!gameActive || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell)) {
        statusText.textContent = "It's a Draw! 😐";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset game
function resetGame() {
    gameBoard.fill(null);
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's Turn`;
    cells.forEach(cell => (cell.textContent = ""));
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
