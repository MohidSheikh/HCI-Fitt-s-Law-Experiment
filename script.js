// Variables
let target = document.getElementById('target');
let startButton = document.getElementById('start-button');
let feedback = document.getElementById('feedback');
let timeDisplay = document.getElementById('time');
let targetArea = document.getElementById('target-area');
let startTime, endTime;
let experimentEnded = false; // Flag to check if the experiment has ended

// Slider Element
let sizeSlider = document.getElementById('sizeSlider');
let sliderValue = document.getElementById('sliderValue');

// Event Listener for Start Button
startButton.addEventListener('click', startExperiment);

// Event Listener for Size Slider
sizeSlider.addEventListener('input', function() {
    // Update target size based on slider value
    target.style.width = sizeSlider.value + 'px';
    target.style.height = sizeSlider.value + 'px';
    sliderValue.textContent = sizeSlider.value; // Update size value displayed
});

// Start Experiment
function startExperiment() {
    experimentEnded = false; // Reset the experiment ended flag when starting a new experiment
    startButton.disabled = true;
    feedback.textContent = "Click the target as fast as you can!";
    timeDisplay.textContent = "Time: 0s";
    placeTarget(); // First target position

    startTime = new Date(); // Start time when experiment begins
    let timeInterval = setInterval(function() {
        let elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timeDisplay.textContent = "Time: " + elapsedTime + "s";
    }, 1000);

    // Set target click listener
    target.addEventListener('click', targetClickHandler);
}

// Target Click Handler
function targetClickHandler() {
    if (experimentEnded) return; // If the experiment has ended, prevent further clicks

    endTime = new Date();
    let reactionTime = (endTime - startTime) / 1000; // in seconds
    feedback.textContent = "You clicked the target in " + reactionTime + " seconds!";
    experimentEnded = true; // Mark experiment as ended

    // Disable further clicks
    target.removeEventListener('click', targetClickHandler);

    setTimeout(() => {
        startButton.disabled = false;
        startButton.textContent = "Start Again";
    }, 2000);
}

// Place target in random location
function placeTarget() {
    let areaWidth = targetArea.offsetWidth;
    let areaHeight = targetArea.offsetHeight;
    let maxX = areaWidth - target.offsetWidth;
    let maxY = areaHeight - target.offsetHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
}