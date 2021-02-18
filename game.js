// Set up global variables

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;
let level = 0;

// Start game

document.addEventListener("keydown", function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

// Track user clicks

document.querySelectorAll(".btn").forEach((item) => {
  //Add event listener to all buttons
  item.addEventListener("click", function () {
    let userChosenColour = this.getAttribute("id");

    //add clicked colour to array
    userClickedPattern.push(userChosenColour);

    //play sound and animation associated with clicked colour
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(level);
  });
});

// Check user is entering correct sequence

function checkAnswer(level) {

  let ind = userClickedPattern.length - 1;

  //check last clicked button was correct
  if (gamePattern[ind] === userClickedPattern[ind]) {
    //if end of sequence successfully reached move to next level
    if (userClickedPattern.length === level) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //game over sequence
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    document.querySelector("#level-title").textContent =
      "Game Over, Press Any Key to Restart";
    startOver();
  }
}

// Trigger next step in sequence

function nextSequence() {
  
  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;

  //randomly generate next button in sequence
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //cause button to flash without using jQuery
  //"flash" is a css clash with visibility: none
  document.querySelector("#" + randomChosenColour).classList.toggle("flash");
  setTimeout(function () {
    document.querySelector("#" + randomChosenColour).classList.toggle("flash");
  }, 100);
  playSound(randomChosenColour);
}

// Audio-visual functions

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  document.querySelector("#" + currentColour).classList.toggle("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentColour).classList.toggle("pressed");
  }, 100);
}

// Reset global variables at game end

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
