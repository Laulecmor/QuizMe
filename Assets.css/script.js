// My variables 

var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var questionsEl = document.getElementById("questions");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var resultsEl = document.getElementById("result");
var quizBody = document.getElementById("quiz");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("name");
var highscoreDisplay = document.getElementById("HighscorePage");
var highscoreDisplayName = document.getElementById("highscore-name");
var highscoreDisplayScore = document.getElementById("highscore-score");
var highscoreContainer = document.getElementById("highscoreContainer");
var quizTimer = document.getElementById("timer");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");


// QuizMe Questions 

var quizQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correctAnswer: "b"
},

{
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correctAnswer: "b"
},

{
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correctAnswer: "b"
},

{
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correctAnswer: "b"
},

{
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correctAnswer: "b"
},

{
    question: "Inside which HTML element do we put the JavaScript?",
    a: "<scripting>",
    b: "<script>",
    c: "<javascript>",
    d: "<js>",
    correctAnswer: "b"
},
];

// More variables

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 45;
var timeInterval;
var score = 0;
var correct;

// A function to generate my questions and answers

function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.a;
    buttonB.innerHTML = currentQuestion.b;
    buttonC.innerHTML = currentQuestion.c;
    buttonD.innerHTML = currentQuestion.d;
};

// Start QuizMe Questions (hides button) & starts the timer

function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    // Timer for Quiz

    timeInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}

// The following if else statement and function will check for correct and false answers. 

function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("YAY, You got it right!");
        currentQuestionIndex++;
        generateQuizQuestion();
    
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Uh OH, You got it wrong!")
        currentQuestionIndex++;
        generateQuizQuestion();
       
    } else {
        showScore();
    }
}

// Screen for after the QuizMe is finished

function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timeInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// The following lines save the highscores and names into the local storage. 

submitScoreBtn.addEventListener("click", function highscore() {

    if (highscoreInputName.value === "") {
        alert("Name can't be blank!");
        return false;
    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
});

// The following function clears out the highscores.

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// The following function only displays the High score page

function showHighscore() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// The following function clears the text from the highscore page.

function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// The following function allows you to replay the Quiz.

function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 45;
    score = 0;
    currentQuestionIndex = 0;
}

// This is the start button for the quiz.

startQuizButton.addEventListener("click", startQuiz);