const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.getElementById("winningMessageText");
const restartButton = document.getElementById("restartButton");

const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let oTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    oTurn = false;
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.add("hidden");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = "Draw!";
    } else {
        winningMessageTextElement.textContent = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.remove("hidden");
}

function isDraw() {
    return [...cells].every((cell) => {
        return (
            cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        );
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(oTurn ? O_CLASS : X_CLASS);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
