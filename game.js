var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var gameStart = new Boolean (true);

var level=0;

//Starting the game with pressing A//
$(document).on("keydown",function(event){
    var keyPressed= event.key;
if(keyPressed==="a" && gameStart==true){
    userClickedPattern = [];
    nextSequence();
    gameStart = false;

}
});


//Checking the clicked buttons//
$(".btn").on("click", function(event){
    var userChosenColour = handler(event);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour );
    playSound(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
   
});


function nextSequence(){
 var randomNumber= Math.floor(4*Math.random());
 var randomChosenColour =buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 $("#" +randomChosenColour).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
 $("#level-title").text("Level "+level);
 level++;
}
function handler(event){
    var userChosenColour = event.target.id;
  
    return userChosenColour;
}
function playSound(name){
    var chosenColourAudio = new Audio( "sounds/" +name+ ".mp3");

    chosenColourAudio.play();

}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
  
   if (userClickedPattern[currentLevel]=== gamePattern[currentLevel]) {
    if (userClickedPattern.length===gamePattern.length){
       setTimeout( nextSequence, 1000);
       userClickedPattern=[];

    }

   }
   else if(gameStart==false){
    $("#level-title").text("Game Over ");
    var gameOverAudio = new Audio ("sounds/wrong.mp3"); 
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){  $("body").removeClass("game-over");
},200)
   startOver();
   }


}

function startOver(){
 gameStart=true;
 gamePattern=[];
 level=0;
 setTimeout( function(){
 $("#level-title").text("Press A Key to Start ");}, 1000);


}