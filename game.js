/** page loads for first time
 * - check if first time game loaded
 * - if so start setup.(change title and game level to current, start the sequence, change bool to true)
 * - next sequence(reset user patterns[], change level to 1,get random num 1-4, get colour from [] where num =, add colour to game pattern, animate colour and play sound for user)
 * - wait for user selection
 * - get id of user selection(its string of colour), add to user pattern. Play colour sound, add animation on click.
 * - check user selection. if true play next sequence if no play sound incorrect, change background color, change h1 and p elements, reset gamepattern user pattern and level,
 * - wait for user input. 
 */
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function () {
    if (!gameStarted) {
        //change text, start sequence game started = true
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
    //reset user clicked patterns, start at level 1, get random num and colour, add to game pattern and anime on screen for user to follow.
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
        $("P").text("Unlucky :^), Guess it wasnt. Want to try again?").delay(200).fadeOut('slow').delay(100).fadeIn('slow').delay(200).fadeOut('slow').delay(100).fadeIn('slow');
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