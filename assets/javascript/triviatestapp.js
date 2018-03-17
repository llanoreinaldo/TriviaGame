//Variables that target the HTML divs in JQuery with the matching id's
var startGame = $("#start_button"),
    timerDiv = $("#timer"),
    questionsDiv = $("#question_div"),
    choicesDiv = $("#choices_div"),
    correctDiv = $("#correct"),
    incorrectDiv = $("#incorrect"),
    aboveCopy = $("#abovecopy"),
    counter = 0,
    count = 30;

//Game Question Array
var questionsList = [{
        question: "In what state was Friday the 13th filmed?",
        choices: ["Connecticut", "New York", "New Jersey", "Pennsylvania"],
        images: ["assets/images/friday13th1.gif"],
        correct: 2
    },
    {
        question: "The film made $39.75 million dollars on a budget of how much?",
        choices: ["$350,000 dollars", "$450,000 dollars", "$550,000 dollars", "$650,000 dollars"],
        images: ["assets/images/friday13th2.gif"],
        correct: 2
    },
    {
        question: "What was the real name of the camp that the movie was filmed at?",
        choices: ["Camp Crystal Lake", " Camp No-Be-Bos-Co", "Camp Tiki Taka", "Camp Dudley"],
        images: ["assets/images/friday13th3.gif"],
        correct: 1
    },
    {
        question: "What famous American singer's played the character of Bill?",
        choices: ["Bing Crosby", "Burl Ives", "Johnny Mathis", "Perry Cuomo"],
        images: ["assets/images/friday13th4.gif"],
        correct: 0
    },
    {
        question: "How long into the movie is it before Jason is actually mentioned?",
        choices: ["1 hour and 1 mins", "1 hour and 6 mins", "1 hour and 11 mins", "1 hour and 16 mins"],
        image: ["assets/images/friday13th5.gif"],
        correct: 3
    }
];


// GAMEWATCH ACTIVITY (SOLUTION)
// =============================

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var gameWatch = {

    time: 30,

    reset: function () {

        gameWatch.time = 30;

        //Changes the "display" div to "00:30."
        timerDiv.text("00:30");

    },
    start: function () {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(gameWatch.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {

        // Uses clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },
    count: function () {

        // DONE: increment time by 1, remember we cant use "this" here.
        gameWatch.time--;

        // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = gameWatch.timeConverter(gameWatch.time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#timer").text(converted);
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
}

//GAME QUESTION LOGIC
//===========================


askQuestion = function () {

    if (questionsList[counter]) {

        //Adds copy "Time till killed:" to html and "00:30" to the clock
        aboveCopy.text("Time till killed: ");
        gameWatch.reset();


        //Creates a new variable to target the question
        var newQ = [questionsList[counter].question];

        //This creates the new div for the targeted question and add the content in the same line    
        var newQuestionDiv = $("<div>" + newQ + "</div>");

        //This adds "display" as a class attribute to the Question div's
        questionsDiv.addClass('display2')

        //This adds the placeholder div to the main div on the page ("#question-div")
        questionsDiv.append(newQuestionDiv);

        //This sets up an array for the choices in the selected question        
        var choicesArr = questionsList[counter].choices;

        //Creates a button array to deposit each newly created button.
        var buttonsArr = [];

        for (var i = 0; i < choicesArr.length; i++) {
            var newDiv = $('<div>')
            var button = $('<button>');
            button.text(choicesArr[i]);
            button.attr('data-id', i);
            button.addClass('btn-outline-danger btn-lg btn-block');
            choicesDiv.append(newDiv);
            choicesDiv.append(button);

        }
        gameWatch.start();

    }
    //Sets logic for when correct answer is picked
    var correct = questionsList[counter].correct;  

    answer = function (correct) {
        var string = correct ? 'correct' : 'choicesArr';
        answers[string]++;
        $('.' + string).html(string + ' answers: ' + answers[string]);
    };
    return;
}




if (gameWatch.count <= 0) {
    gameWatch.stop();
    counter++;
    questionsList();
};


var Trivia;

startGame.click(function () {
    $(this).hide();
    //    $(".result").remove();
    // $('div').html('');
    askQuestion();

});



/*


} else {
        $('body').append($('<div />', {
            text: 'Unanswered: ' + (
                questions.length - (answer.correct + answers.incorrect)),
            class: 'result'
        }));
        $('start_button').text('Restart').appendTo('body').show();
    }

    //Function to register user choice during trivia game
    choicesDiv.on('click', 'button', function (e) {
        var userSelection = $(this).data("id"),
            //th = Trivia || $(window).questionsList(),
            index = questionsList[current].correct,
            correct = questionsList[current].choices[index];

        if (userSelection !== index) {
            choicesDiv.text("Wrong Answer! The correct answer was: " + correct);
            answer(false);
        } else {
            choicesDiv.text("Correct!!! The correct answer was: " + correct);
            answer(true);
        }
        //nextQuestion();
    });
displayQuestions = function () {

    //Adds copy "Time till killed:" to html and "00:30" to the clock
    aboveCopy.text("Time till killed: ");
    gameWatch.reset();


    //Creates a new variable to target the question
    var newQ = [questionsList[counter].question];

    //This creates the new div for the targeted question and add the content in the same line    
    var newQuestionDiv = $("<div>" + newQ + "</div>");

    //This adds "display" as a class attribute to the Question div's
    questionsDiv.addClass('display2')

    //This adds the placeholder div to the main div on the page ("#question-div")
    questionsDiv.append(newQuestionDiv);

    //This sets up an array for the choices in the selected question        
    var choicesArr = questionsList[counter].choices;

    //Creates a button array to deposit each newly created button.
    var buttonsArr = [];

    for (var i = 0; i < choicesArr.length; i++) {
        var newDiv = $('<div>')
        var button = $('<button>');
        button.text(choicesArr[i]);
        button.attr('data-id', i);
        button.addClass('btn-outline-danger btn-lg btn-block');
        choicesDiv.append(newDiv);
        choicesDiv.append(button);

    }



    gameWatch.start();

};


*/


//Need to hear start button click to start game.

//Need to create <divs> to display questions

//Need to create timer and display 30 secons that starts on click

//Need to create array that contains questions, choices, correct answer, and gif images

//Randomize question displayed in game

//Need to create right and wrong counters

//Need to set game logic rules:
//If clock runs out, display correct answer message and gift, and add to wrong counter
//If right answer selected, display congratulations message and gift, plus add to right counter
//If wrong answer selected, display wrong answer message, show correct answer and gif, and add to wrong counter