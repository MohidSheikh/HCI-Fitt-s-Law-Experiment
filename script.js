const target = document.getElementById('target');
const startButton = document.getElementById('start-button');
const feedback = document.getElementById('feedback');
const timeDisplay = document.getElementById('time');
const sizeSlider = document.getElementById('sizeSlider');
const sliderValue = document.getElementById('sliderValue');
const gameCanvas = document.getElementById('game-canvas');
const loaderText = document.getElementById('canvas-loader');
const scoreList = document.getElementById('score-list');

let startTime;
let timerInterval;
let experimentActive = false;
let scoreHistory = [];

// Initialize
updateTargetSize(sizeSlider.value);

sizeSlider.addEventListener('input', (e) => {
    sliderValue.textContent = e.target.value;
    updateTargetSize(e.target.value);
});

startButton.addEventListener('click', startExperiment);
target.addEventListener('click', handleTargetClick);

function updateTargetSize(size) {
    target.style.width = `${size}px`;
    target.style.height = `${size}px`;
}

function startExperiment() {
    experimentActive = true;
    startButton.disabled = true;
    loaderText.style.display = 'none';
    feedback.textContent = "Click the target!";

    placeTarget();
    target.style.display = 'block';

    startTime = performance.now();

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
        timeDisplay.textContent = `${elapsed}s`;
    }, 10);
}

function handleTargetClick() {
    if (!experimentActive) return;

    const endTime = performance.now();
    const finalTime = ((endTime - startTime) / 1000).toFixed(3);
    const currentSize = sizeSlider.value;

    experimentActive = false;
    clearInterval(timerInterval);
    target.style.display = 'none';
    loaderText.style.display = 'block';

    feedback.innerHTML = `Hit! <strong>${finalTime}s</strong>`;
    timeDisplay.textContent = `${finalTime}s`;

    updateHistory(finalTime, currentSize);

    setTimeout(() => {
        startButton.disabled = false;
        startButton.textContent = "Start Again";
    }, 800);
}

function updateHistory(time, size) {
    scoreHistory.unshift({ time, size });
    if (scoreHistory.length > 5) scoreHistory.pop();
    renderHistory();
}

function renderHistory() {
    scoreList.innerHTML = '';
    scoreHistory.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'score-item';
        li.innerHTML = `<strong>${entry.time}s</strong> <span>Size: ${entry.size}px</span>`;
        scoreList.appendChild(li);
    });
}

function placeTarget() {
    const areaWidth = gameCanvas.clientWidth;
    const areaHeight = gameCanvas.clientHeight;
    const targetSize = parseInt(sizeSlider.value);
    const padding = 25;

    const maxX = areaWidth - targetSize - padding;
    const maxY = areaHeight - targetSize - padding;

    const randomX = Math.floor(Math.random() * (maxX - padding) + padding);
    const randomY = Math.floor(Math.random() * (maxY - padding) + padding);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}