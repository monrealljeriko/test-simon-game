// This is the line of commnents

var buttonColors = [
  "green",
  "red",
  "white",
  "violet",
  "yellow",
  "blue",
  "pink",
  "orange",
];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var highScore = 0;
var userChosenColor = "";
var isGameStarted = false;

$(document).on("keypress", function () {
  if (!isGameStarted) {
    nextSequence();
  }
});
$("#level-title").on("click", function () {
  if (!isGameStarted) {
    nextSequence();
  }
});

// play sound
function playSound(name) {
  // Handle the sound file type
  var audioFileName = "sounds/" + name + ".mp3";
  var audioPlay = new Audio(audioFileName);
  audioPlay.play();
}

// animate when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 300);
}

// check user clicks
function checkAnswer(lastIndex) {
  if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("Sequenced matched!");
      setTimeout(function () {
        console.log("You finished the sequence!");
        if (level > highScore) {
          highScore++;
        }
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    console.log("Sequence unmatched!");
    playSound("wrong");
    userClickedPattern = [];
    restartGame();
  }
  console.log(gamePattern);
  console.log(userClickedPattern);
}

function userInputPattern() {
  if (userChosenColor === "") {
    $(".btn").click(function () {
      userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      playSound(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    });
  }
}

// main handler
function nextSequence() {
  level++;
  isGameStarted = true;
  userClickedPattern = [];

  //generate random numer and set color
  var randomNumber = Math.floor(Math.random() * 8);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  console.log(gamePattern);
  // update level and high score
  $("#level-title").text("Level " + level);
  $("#best-title span").text(highScore);

  // box animation
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  userInputPattern();
}
// restart the game
function restartGame() {
  $("#level-title").text("Game Over!");
  $("#level-title").append("<br>Press a key or Click me to restart");
  level = 0;
  gamePattern = [];
  isGameStarted = false;
}
