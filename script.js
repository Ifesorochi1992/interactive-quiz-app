
// STORE QUIZ QUESTIONS

const questions = [
    {
        question: "What is the capital city of Nigeria?",
        answers: [
            "Lagos",
            "Abuja",
            "Enugu",
            "Kano"
        ],
        correctAnswer: "Abuja"
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            "Earth",
            "Venus",
            "Mars",
            "Jupiter"
        ],
        correctAnswer: "Mars"
    },

    {
        question: "How many continents are there in the world?",
        answers: [
            "Five",
            "Six",
            "Seven",
            "Eight"
        ],
        correctAnswer: "Seven"
    },

    {
        question: "Which animal is known as the King of the Jungle?",
        answers: [
            "Elephant",
            "Lion",
            "Tiger",
            "Leopard"
        ],
        correctAnswer: "Lion"
    },

    {
        question: "Which language is mainly used to structure a webpage?",
        answers: [
            "CSS",
            "Python",
            "HTML",
            "Java"
        ],
        correctAnswer: "HTML"
    }
];

// QUIZ VARIABLES

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// SELECT HTML ELEMENTS

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");

const nextButton = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

// START THE QUIZ

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    welcomeScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    scoreElement.textContent = "Score: " + score;

    displayQuestion();
}

// DISPLAY QUESTIONS

function displayQuestion() {

    answered = false;

    nextButton.classList.add("hide");

    feedbackElement.textContent = "";

    answerButtons.innerHTML = "";

    let currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        "Question " + (currentQuestionIndex + 1) +
        " of " + questions.length;

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(function(answer) {

        const button = document.createElement("button");

        button.textContent = answer;

        button.classList.add("answer-btn");

        button.addEventListener("click", function() {
            selectAnswer(button, answer);
        });

        answerButtons.appendChild(button);

    });

    scoreElement.textContent = "Score: " + score;
}

// CHECK THE SELECTED ANSWER

function selectAnswer(button, selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer =
        questions[currentQuestionIndex].correctAnswer;

    const allButtons = answerButtons.children;

    if (selectedAnswer === correctAnswer) {

        feedbackElement.textContent = "Correct! Well done!";

        feedbackElement.style.color = "green";

        button.classList.add("correct");

        score++;

    } else {

        feedbackElement.textContent = "Incorrect! The correct answer is " + correctAnswer;

        feedbackElement.style.color = "red";

        button.classList.add("incorrect");

        // Highlight the correct answer
        for (let i = 0; i < allButtons.length; i++) {

            if (allButtons[i].textContent === correctAnswer) {

                allButtons[i].classList.add("correct");

            }
        }
    }

    // Prevent answering the same question again
    for (let i = 0; i < allButtons.length; i++) {

        allButtons[i].disabled = true;

    }

    scoreElement.textContent = "Score: " + score;

    nextButton.classList.remove("hide");

    if (currentQuestionIndex === questions.length - 1) {

        nextButton.textContent = "See Results";

    } else {

        nextButton.textContent = "Next Question";

    }
}

// MOVE TO THE NEXT QUESTION

function nextQuestion() {

    if (currentQuestionIndex < questions.length - 1) {

        currentQuestionIndex++;

        displayQuestion();

    } else {

        showResult();

    }
}

// SHOW FINAL RESULT

function showResult() {

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");

    finalScore.textContent =
        "You scored " + score + " out of " + questions.length + "!";

}

// RESTART THE QUIZ

function restartQuiz() {

    currentQuestionIndex = 0;

    score = 0;

    answered = false;

    startQuiz();

}
// BUTTON EVENT LISTENERS

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartQuiz);

