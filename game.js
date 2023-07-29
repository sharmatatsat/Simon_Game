
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0; 
var points = 0;

$(document).keypress(function() {
  if (!started) {                                         // Function to modify levels once user makes the correct answer. 
    $("#level-title").text("Level " + level);
    $("h2").text("Points : " + points)                      
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");    // push the colour which user clicks into userpattern array 
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);    // Function declared 
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);  // coz  index starts from 0
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){                // To check if the chosen pattern is correct
        points+=2;   
        $("h2").text("Points : " + points)                       // A random number is generated and corresponding to it that index of the gamepattern[]  is initiated 
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);  
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;  
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);        // Animation upon clicking a button and  distinct sound of each colour
  playSound(randomChosenColour);
}




function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");           
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  points = 0;
  $("h2").text("Points : " + points)
  gamePattern = [];
  started = false;
}


