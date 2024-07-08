var buttonColors = ["red", "blue", "green", "yellow" ]; 

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// var gpIndex = gamePattern.length-1;




$(document).on("keypress", function(){

   if(!started) {

    $("#level-title").text("level "+level); 
    nextSequence();
    started = true;
   }
    
});



$(".btn").on("click",function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    // console.log("UCP: " +userClickedPattern);

    var index = userClickedPattern.length-1;
    checkAnswer(index); 

    

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){


            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over,press any key to restart");

        startOver();

    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+level);

    var randomNumber = Math.floor( Math.random()*4 );
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // console.log("gamePattern: " +gamePattern);

    $("#"+randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

    // console.log("GP: " +gamePattern);


    playSound(randomChosenColor);

}



function playSound(name){

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();

}

function animatePress(currentColor){

    $("#"+ currentColor).addClass("pressed");
   
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}








        





