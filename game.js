let arrayColors = ["blue","red","yellow","green"];

let gamePattern = [];
let userClickedPattern = [];

let flag = 0;
let level = 0;
$(document).on("keydown",function(){
  if (flag===0) {
    // $(document).on("keydown",nextSequence());
    $("h1#level-title").text("Level "+level);
    nextSequence();
    flag++;
  }
});

$(".btn").click(function(){
  let userChosenColor = $(this).attr("id");
  // console.log("Most Recent color: "+userChosenColor);
  userClickedPattern.push(userChosenColor);

  let sound = "sounds/"+userChosenColor+".mp3";
  playSound(sound);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  let audio = new Audio(name);
  // console.log(name);
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  // console.log("inside checkAnswer");
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {

    if (gamePattern.length===userClickedPattern.length) {
      console.log("Success");
      // console.log("gamePattern: "+gamePattern);
      // console.log("userClickedPattern: "+userClickedPattern);
      setTimeout(function(){nextSequence()},1000);
    }
  }else {
    console.log("Failure");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("h1#level-title").text("Game Over, Press Any Key to Restart");

    },200);
    playSound("sounds/wrong.mp3");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  flag=0;
}

function nextSequence(){
  // console.log("inside nextSequence");
  userClickedPattern=[];
  level++;
  $("h1#level-title").text("Level "+level);

  let randomNumber = Math.round(Math.random()*3);
  let randomChosenColor = arrayColors[randomNumber];
  gamePattern.push(randomChosenColor);
  let colorID = "#"+randomChosenColor;
  $(colorID).fadeOut(100).fadeIn(100);

  let sound = "sounds/"+randomChosenColor+".mp3";
  playSound(sound);
}
