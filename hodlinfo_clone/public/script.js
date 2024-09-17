import dbresponse from "../routes/Server.js";

const totalTime = 60; // Total time in seconds
let currentTime = totalTime;
const timeDisplay = document.querySelector('.time');
const progressCircle = document.querySelector('.progress');
const radius = 13.5; // Circle radius
const circumference = 2 * Math.PI * radius; // Circumference of the circle

// Set the stroke-dasharray to the circumference
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference; // Start fully filled

function startTimer() {
    const interval = setInterval(() => {
        currentTime--;
        updateTimerDisplay(); 
        updateProgressCircle();

        if (currentTime <= 0) {
            clearInterval(interval);
            currentTime = totalTime; // Reset to 60 seconds
            startTimer(); // Restart the timer
        }
    }, 1000); 
}

function updateTimerDisplay() {
    timeDisplay.textContent = currentTime;
}

function updateProgressCircle() {
    const offset = (currentTime / totalTime) * circumference; // Calculate new offset
    progressCircle.style.strokeDashoffset = offset; // Update the offset
}

// Start the timer when the page loads
window.onload = startTimer;

let parent = document.getElementById('parent');
let h1 = document.createElement("h1");
h1.textContent = "Sai sesha reddy";
parent.appendChild(h1);


console.log(dbresponse)