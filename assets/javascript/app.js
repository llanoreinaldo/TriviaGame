$(document).ready(function () {
    // Create a function that creates the start button and initial screen

    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-danger btn-lg btn-block start_button' href='#' role='button'>Start Quiz</a></p>";
        $("#wrapper").html(startScreen);
    }

    initialScreen();

    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

    $("body").on("click", ".start_button", function (event) {
        event.preventDefault(); // added line to test issue on GitHub Viewer
        themeSound.play();
        generateHTML();
        timerWrapper();

    }); // Closes start-button click

    $("body").on("click", ".answer", function (event) {
        //answeredQuestion = true;
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");

            clearInterval(theClock);
            rightSound.play();
            generateWin();
        } else {
            //alert("wrong answer!");
            clearInterval(theClock);
            wrongSound.play();
            generateLoss();
        }
    }); // Close .answer click

    $("body").on("click", ".reset-button", function (event) {
        themeSound.play();
        resetGame();
    }); // Closes reset-button click

}); //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/friday13thX.gif'>";
    $("#wrapper").html(gameHTML);
    setTimeout(wait, 5000); //  change to 5000 or other amount
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $("#wrapper").html(gameHTML);
    setTimeout(wait, 5000); //  change to 5000 or other amount
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/friday13thX.gif'>";
    $("#wrapper").html(gameHTML);
    setTimeout(wait, 5000); //  change to 5000 or other amount
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $("#wrapper").html(gameHTML);
}

function wait() {
    if (questionCounter < 4) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    } else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $("#wrapper").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["In what state was Friday the 13th filmed?", "The film made $39.75 million dollars on a budget of how much?", "What was the real name of the camp that the movie was filmed at?", "What famous American singer's played the character of Bill?", "How long into the movie is it before Jason is actually mentioned?"];
var answerArray = [
    ["Connecticut", "New York", "New Jersey", "Pennsylvania"],
    ["$350,000 dollars", "$450,000 dollars", "$550,000 dollars", "$650,000 dollars"],
    ["Camp Crystal Lake", "Camp No-Be-Bos-Co", "Camp Tiki Taka", "Camp Dudley"],
    ["Bing Crosby", "Burl Ives", "Johnny Mathis", "Perry Cuomo"],
    ["1 hour and 1 mins", "1 hour and 6 mins", "1 hour and 11 mins", "1 hour and 16 mins"]
];
var imageArray = ["<img class='center-block img-right' src='assets/images/friday13th1.gif'>", "<img class='center-block img-right' src='assets/images/friday13th2.gif'>", "<img class='center-block img-right' src='assets/images/friday13th3.gif'>", "<img class='center-block img-right' src='assets/images/friday13th4.gif'>", "<img class='center-block img-right' src='assets/images/friday13th5.gif'>"];
var correctAnswers = ["C. New Jersey", "C. $550,000 dollars", "B. Camp No-Be-Bos-Co", "A. Bing Crosby", "D. 1 hour and 16 mins"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var themeSound = new Audio("assets/sounds/fridaythe13th.mp3");
var rightSound = new Audio("assets/sounds/Kill her Mommy2.mp3");
var wrongSound = new Audio("assets/sounds/jason2.mp3");