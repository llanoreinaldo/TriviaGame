//Variables that target the HTML divs in JQuery with the matching id's
var timerDiv = $("timer");
var questionsDiv = $("#question_div");
var choicesDiv = $("#choices_div");
var correctDiv = $("#correct");
var incorrectDiv = $("#incorrect");
var counter = 0;
var count = 30;

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


$("#start_button").click(function () {
    $(this).hide();
    displayQuestions();
});


displayQuestions = function () {


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
        button.addClass('btn-danger');
        choicesDiv.append(newDiv);
        choicesDiv.append(button);

    }
}



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