// Questions and answers Array
var questions = [
  {
    question: 'When did the Libery Bell get its name?',
    answers: [
      { answer: 'A. When it was made in 1701', value: false },
      { answer: 'B. In the 19th centure when it became a symbol of abolition of slavery', value: true },
      { answer: 'C. When it rang on July 4th, 1776', value: false },
      { answer: "D. None of the above", value: false }
    ]
  },
  {
    question: 'Which of the following items was owned by the fewest U.S homes in 1990?',
    answers: [
      { answer: 'home computer', value: false },
      { answer: 'compact disk player', value: true },
      { answer: 'cordless phone', value: false },
      { answer: 'dishwasher', value: false }
    ]
  },
  {
    question: 'In the year 1900 in the U.S what was the most popular baby name for boys and girls?',
    answers: [
      { answer: 'John and Mary', value: true },
      { answer: 'William  and Elizabeth', value: false },
      { answer: 'Joseph and Catherine', value: false },
      { answer: 'George and Anne', value: false }
    ]
  },
  {
    question: 'Who holds the record for the most victories in a row on the professional golf tour?',
    answers: [
      { answer: 'Byron Nelson', value: true },
      { answer: 'Jack Nicklaus', value: false },
      { answer: 'Arnold Palmer', value: false },
      { answer: "Ben Hogan", value: false }
    ]
  },
  {
    question: "Who is 3rd behind Hank Aaron and Babe Ruth in major league career home runs?",
    answers: [
      { answer: 'Willie Mays', value: true },
      { answer: 'Reggie Jackson', value: false },
      { answer: 'RHarmon Killbrew', value: false },
      { answer: 'Frank  Robinson', value: false }
    ]
  },
  {
    question: 'In 1990 what perentage of U.S married couples did the wife earn more money than husband?',
    answers: [
      { answer: '38', value: false },
      { answer: '8', value: false },
      { answer: '18', value: true },
      { answer: '58', value: false }
    ]
  },
  {
    question: 'Which of these characters turned 40 years old in 1990?',
    answers: [
      { answer: 'Charlie Brown', value: true },
      { answer: 'Bugs Bunny', value: false },
      { answer: 'Mickey Mouse', value: false },
      { answer: 'Fred Flintstone', value: false }
    ]
  }
];

// Global variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    // console.log($(this));
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.first-answer').css('background-color', 'green');
        $('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 6) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}

// Timer function
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

// Finishing the game
function finishGame() {
  var final = $('.main')
    .html("<p>All done, here's how you did!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}
