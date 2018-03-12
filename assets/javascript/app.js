//Game Variables

var playGame = 0,
    wins = 0,
    losses = 0,
    randomGame = '',
    //Audio Files

    oneAudio = new Audio('assets/sounds/fridaythe13th.mp3'),
    twoAudio = new Audio('assets/sounds/Jaws-theme-song.mp3'),
    threeAudio = new Audio('assets/sounds/Halloween Theme.mp3'),
    backImg = ["background1", "background2", "background3"],
    themeSong = ["fridaythe13th", "jaws-theme-song", "Halloween Theme"];

//DOM Declations for hooking into
var DOMthemesong = document.getElementById('themesong'),
    DOMbackImg = document.getElementById('backgroundImg');

//Starts Game on web page loading

function startGame() {
    window.onload();

    for (var i = 0; i < backImg.length; i++) {

        x = backImg[i];
        DOMbackImg.innerHTML.src = "./assets/images/" + x + ".jpg";
    }

    for (var i = 0; i < themeSong.length; i++) {
        y = themeSong[i];
        DOMthemesong.innerHTML.src = "./assets/sounds/" + y + ".mp3";
    }

}


//GAME TIMER (SOLUTION)
// =============================

// This code will run as soon as the page loads
window.onload = function () {
    // $("#reset").on("click", gameTimer.replay);
    gameTimer.start();
    //Random Game Play 

    if (gameTimer.t === 0) {
        gameTimer.stop()
    }
   };

//  Variable that will hold our setInterval that runs the game timer
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our game timer object
var gameTimer = {

    time: 30,

    replay: function () {

        gameTimer.time = 30;


        // DONE: Change the "display" div to "30 seconds."
        $("#display").text("30 seconds");

    },
    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(gameTimer.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function () {

        // DONE: decrement time by 1, remember we cant use "this" here.
        gameTimer.time--;

        // DONE: Get the current time, pass that into the gameTimer.timeConverter function,
        //       and save the result in a variable.
        var converted = gameTimer.timeConverter(gameTimer.time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};