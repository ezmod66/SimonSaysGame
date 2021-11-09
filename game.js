var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function () {
    if (!gameStarted) {

        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

//detect what button is pressed
$(".btn").click(function () {
    //save currently clicked id to the user selected color
    var userChosenColour = $(this).attr("id");
    //take this id and save it to the clicked patternn (id will be a colour string from html)
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatedPress(userChosenColour);

    CheckUserAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = []

    level++;
    $("#level-title").text("Level:" + level);

    //get random num betwwen 1-4
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    //flash out and in with timer of 200
    $("#" + randomChosenColour).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
}

//add animation of key being pressed on click
function animatedPress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 200);
}

//separate function can be used to play audio no matter the context
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function CheckUserAnswer(userCurrentLevel) {

    if (gamePattern[userCurrentLevel] === userClickedPattern[userCurrentLevel]) {
        console.log("true");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        playSound("wrong");
        console.log("false");

        $("body").addClass("game-over");
        //added mild taunt
        $("h1").text("Game Over, Press Any Key to Restart");
        $("P").text("Unlucky :^), Guess it wasnt");
        setTimeout(function () {
            $("body").removeClass("game-over")
        },400)
        startOver();
    }
}
//reset level, game pattern and started variable
function startOver() {
    level = 0;
    gameStarted = false;
    gamePattern = [];
}