const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const questions = [
  {
    question: "What is the most satisfying to you?",
    answers: [
      "taking objectives",
      "getting kills",
      "stealing kills",
      "1v1s"
    ],
    points: [
      [1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0]
    ]
  },
  {
    question: "What tilts you the most?",
    answers: [
      "watching someone miss cs",
      "getting killed under tower",
      "when your team doesn’t know how to group",
      "when the laner doesn’t ping missing"
    ],
    points: [
      [1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 1, 0, 0]
    ]
  },
  {
    question: "Which piece of hardware do you like more?",
    answers: [
      "mouse",
      "keyboard"
    ],
    points: [
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 1]
    ]
  },
  {
    question: "What are you good at?",
    answers: [
      "roaming",
      "mechanics",
      "general game knowledge",
      "decision making"
    ],
    points: [
      [0, 0, 1, 0, 1],
      [0, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 1, 0, 0, 0]
    ]
  },
  {
    question: "What do you struggle with?",
    answers: [
      "last-hitting",
      "positioning",
      "tunnel vision",
      "landing abilities"
    ],
    points: [
      [0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1],
      [1, 0, 0, 1, 1]
    ]
  },
  {
    question: "What are you doing in a team fight?",
    answers: [
      "picking off their adc",
      "dealing lots of damage",
      "peeling for the team",
      "actually I’m split pushing"
    ],
    points: [
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0]
    ]
  },
  {
    question: "Is your goal to climb in ranked?",
    answers: [
      "no, I mostly play norms",
      "yes, solo queue",
      "yes, with my duo partner",
      "yes, in flex"
    ],
    points: [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0]
    ]
  }
];
const results = [
  "top",
  "jungle",
  "mid",
  "adc",
  "support"
]

function buildQuiz(){
  quizContainer.style.display = 'inline-block';
  resultsContainer.style.display = 'none';

  const output = [];

  questions.forEach(
    (currentQuestion, questionNumber) => {

      const answers = [];

      for(num in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${num}">
            ${currentQuestion.answers[num]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){
  quizContainer.style.display = 'none';

  var roles = [0, 0, 0, 0, 0];

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // for each question...
  questions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = 'input[name=question'+questionNumber+']:checked';
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    const points = questions[questionNumber].points[userAnswer];

    for (var i = 0; i < roles.length; i++) {
      roles[i] += points[i];
    }

  });

  var max = roles[0];
  var index = 0;

  for (i = 1; i < roles.length; i++){
    if (roles[i] > max) {
      max = roles[i];
      index = i;
    }
  }

  // show the role
  resultsContainer.innerHTML = 'You should main '+results[index]+'!';
  resultsContainer.style.display = 'block';
}


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);
retryButton.addEventListener('click', buildQuiz);
