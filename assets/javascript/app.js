//Sets Trivia Game Function 
$.fn.trivia = function () {
    
    //Sets Global Variables
    var th = this;
    th.userSelection = null;
    th.answers = {
        correct: 0,
        incorrect: 0
    };
    th.images = null;
    th.count = 30;
    th.current = 0;

    //Sets Questions, Answers, and identifies Correct choice.
    th.questions = [{
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

    //Recalls the question
      th.ask = function () {

        if (th.questions[th.current]) {
            $('#timer').html("Time till dead: " + "00:" + th.count + " seconds");
            $('#question_div').html(th.questions[th.current].question);
            var choicesArr = th.questions[th.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(th.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    th.questions.length - (th.answer.correct + th.answers.incorrect)),
                class: 'result'
            }));
            $('start_button').text('Restart').appendTo('body').show();
        }
    };

    //Sets Game Timer Function for Clock Countdown logic
    th.timer = function () {
        th.count--;
        if (th.count <= 0) {
            setTimeout(function () {
                th.nextQuestion();
            });
        } else {
            $('#timer').html('Time till dead: ' + "00:" + th.count + " seconds");
        }
    };

    //Sets Next Question Function Logic
    th.nextQuestion = function () {
        th.current++;
        clearInterval(window.triviaCounter);
        th.count = 30;
        $('#timer').html("");
        setTimeout(function () {
            th.cleanUp();
            th.ask();
        }, 1000)
    };

    //Sets logic for when user runs out the game timer
    th.cleanUp = function () {
        $('div[id]').each(function (item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + th.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + th.answers.incorrect);
    };

    //Sets logic for when correct answer is picked
    th.answer = function (correct) {
        var string = correct ? 'correct' : 'incorrect';
        th.answers[string]++;
        $('.' + string).html(string + ' answers: ' + th.answers[string]);
    };
    return th;
};

var Trivia;

$("#start_button").click(function () {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

//Function to register user choice during trivia game
$('#choices_div').on('click', 'button', function (e) {
    var userSelection = $(this).data("id"),
        th = Trivia || $(window).trivia(),
        index = th.questions[th.current].correct,
        correct = th.questions[th.current].choices[index];

    if (userSelection !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        th.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        th.answer(true);
    }
    th.nextQuestion();
});
