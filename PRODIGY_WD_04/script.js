let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById("timeDisplay");
const lapTimes = document.getElementById("lapTimes");

document.getElementById("startButton").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimeDisplay();
        }, 1000);
    }
});

document.getElementById("pauseButton").addEventListener("click", () => {
    isRunning = false;
    clearInterval(timerInterval);
});

document.getElementById("resetButton").addEventListener("click", () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimeDisplay();
    lapTimes.innerHTML = ""; // Clear laps
});

function updateTimeDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, "0");
    const seconds = String(elapsedTime % 60).padStart(2, "0");
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}
