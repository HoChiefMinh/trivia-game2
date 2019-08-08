var card = $("#quiz-area");

// Question set
var questions = [
  {
    question: "Which song best describes the style of Saul Goodman’s office",
    answers: ["Paradise City", "Sweet Home Alabama", "American the Beautiful", "Panama"],
    correctAnswer: "American the Beautiful"
  },
  {
    question: "Spot the phrase that DID NOT come out of Jesse’s mouth:",
    answers: ["'Yeah bitch, magnets!'", "'Alright, bitch - let's cook.'", "'Yo, Gatorade me, bitch.'", "'So roll me further, bitch.'"],
    correctAnswer: "'Alright, bitch - let's cook.'"
  },
  {
    question: "Walt’s pre-Heisenberg vehicle, the one he runs over the gangsters in, is a…",
    answers: ["Chevy Citation", "Nissan Cube", "Ford Explorer", "Pontiac Aztec"],
    correctAnswer: "Pontiac Aztec"
  },
  {
    question: "What distracts Walt from absorbing the news of his cancer diagnosis?",
    answers: ["The doctor has mustard on his coat.", "The doctors lazy eye.", "A fly buzzing around the room", "His cell phone ringing"],
    correctAnswer: "The doctor has mustard on his coat."
  },
  {
    question: "What primitive weapon do Tuco’s murderous cousins favor?",
    answers: ["Hammer", "Axe", "Pistol", "Sword"],
    correctAnswer: "Axe"
  },
  {
    question:
      "When Walt retired from the meth game, how much money did he walk away with?",
    answers: ["$4 million", "$16 million", "$40 million", "$80 million"],
    correctAnswer: "$80 million"
  },
  {
    question: "Walt doesn’t call it the meth game, though. He calls it…",
    answers: ["Trapping", "the empire business.", "Makking a living", "Pure chemistry"],
    correctAnswer: "the empire business."
  },
  {
    question: "Where is Gus Fring from?",
    answers: ["Argentina", "Italy", "Chile", "Germany"],
    correctAnswer: "Chile"
  }
];

// Variable that will hold the setInterval
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 30,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
