// vars
  var userClickedPattern = [];
  var started = false;
  var gamePattern = [];
  var buttonColours = ["red", "blue", "green", "yellow"];
  var level = 0;

  // Start Game
  $(document).keypress(function(){
    if(started === false){
    nextSequence();
    started = true;
    }
  });

// on click

$(".btn").click(function(){
  if (started === true){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var beep = new Audio("sounds/" + userChosenColour + ".mp3");
    beep.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

//click animation

function animatePress(currentColour){
  $("#"+currentColour).toggleClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).toggleClass("pressed");
  },100);
}

// random color generation

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  var beep = new Audio("sounds/" + randomChosenColour + ".mp3");
  beep.play();
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  level++;
  $("#level-title").text("Level "+level);
  userClickedPattern = [];
}

//Win or lose?

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      console.log("success");
      console.log(userClickedPattern);
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  }
  else{
    gameOver();
  }
}

function gameOver(){
  var gameOver = new Audio("sounds/wrong.mp3");
  gameOver.play();
  $("body").toggleClass("game-over");
  setTimeout(function(){
    $("body").toggleClass("game-over");
  },200);
  restart();
}
function restart(){
  gamePattern = [];
  level = 0;
  started = false;
  setTimeout(function(){
  $("#level-title").text("Press A Key to Start");
},1000);
}
