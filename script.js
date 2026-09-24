/* =========================================================
   PAGE REFERENCES
========================================================= */

const opening = document.getElementById("opening");
const chapterOne = document.getElementById("chapterOne");
const chapterTwo = document.getElementById("chapterTwo");
const memories = document.getElementById("memories");
const game = document.getElementById("game");
const yourTurn = document.getElementById("yourTurn");
const secret = document.getElementById("secret");
const finalLetter = document.getElementById("finalLetter");
const birthdayEnding = document.getElementById("birthdayEnding");


/* =========================================================
   SCROLL TO TOP
========================================================= */

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const allPages = [
    opening,
    chapterOne,
    chapterTwo,
    memories,
    game,
    yourTurn,
    secret,
    finalLetter,
    birthdayEnding
];


function showPage(pageToShow) {

    allPages.forEach(function(page) {

        page.classList.add("hidden");

    });


    pageToShow.classList.remove("hidden");

    scrollToTop();

}


/* =========================================================
   OPEN STORY
========================================================= */

const openButton = document.getElementById("openButton");

openButton.addEventListener("click", function() {

    showPage(chapterOne);

});


/* =========================================================
   CHAPTER ONE NAVIGATION
========================================================= */

const chapterBackButton =
    document.getElementById("chapterBackButton");

const nextButton =
    document.getElementById("nextButton");


chapterBackButton.addEventListener("click", function() {

    showPage(opening);

});


nextButton.addEventListener("click", function() {

    showPage(chapterTwo);

});


/* =========================================================
   CHAPTER TWO NAVIGATION
========================================================= */

const chapterTwoBackButton =
    document.getElementById("chapterTwoBackButton");

const memoriesButton =
    document.getElementById("memoriesButton");


chapterTwoBackButton.addEventListener("click", function() {

    showPage(chapterOne);

});


memoriesButton.addEventListener("click", function() {

    showPage(memories);

});


/* =========================================================
   CHAPTER THREE NAVIGATION
========================================================= */

const memoriesBackButton =
    document.getElementById("memoriesBackButton");

const gameButton =
    document.getElementById("gameButton");


memoriesBackButton.addEventListener("click", function() {

    showPage(chapterTwo);

});


gameButton.addEventListener("click", function() {

    showPage(game);

    resetGame();

});


/* =========================================================
   FRIENDSHIP GAME
========================================================= */

const startGameButton =
    document.getElementById("startGameButton");

const gameCard =
    document.getElementById("gameCard");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const answerResult =
    document.getElementById("answerResult");

const nextQuestionButton =
    document.getElementById("nextQuestionButton");

const gameComplete =
    document.getElementById("gameComplete");

const gameContinueButton =
    document.getElementById("gameContinueButton");


/*
    These are intentionally generic for now.

    Later we can replace them with actual
    memories / inside jokes / personal details.
*/

const gameQuestions = [

    {
        question:
            "Which category is most likely to turn into a long conversation?",

        answers: [
            "Movies",
            "Tax manuals",
            "Operating systems",
            "Instruction manuals"
        ],

        correct: 0
    },


    {
        question:
            "Which activity somehow became part of the friendship lore?",

        answers: [
            "Chess",
            "Ludo",
            "Golf",
            "Formula 1"
        ],

        correct: 1
    },


    {
        question:
            "What is one completely valid form of communication here?",

        answers: [
            "Sending random reels",
            "Faxing documents",
            "Morse code",
            "Carrier pigeons"
        ],

        correct: 0
    },


    {
        question:
            "What can unexpectedly happen during a normal conversation?",

        answers: [
            "It becomes a serious conversation",
            "A rocket launches",
            "The internet disappears",
            "Someone starts a business"
        ],

        correct: 0
    },


    {
        question:
            "After four months of friendship, what is clearly present?",

        answers: [
            "Absolutely no lore",
            "Too much friendship lore",
            "A professional football career",
            "A secret laboratory"
        ],

        correct: 1
    }

];


let currentQuestion = 0;
let gameScore = 0;
let questionAnswered = false;


/* Start */

startGameButton.addEventListener("click", function() {

    startGameButton.classList.add("hidden");

    gameCard.classList.add("active");

    currentQuestion = 0;
    gameScore = 0;

    loadQuestion();

});


/* Load question */

function loadQuestion() {

    questionAnswered = false;

    const question =
        gameQuestions[currentQuestion];


    questionNumber.textContent =
        "QUESTION " +
        (currentQuestion + 1) +
        " / " +
        gameQuestions.length;


    questionText.textContent =
        question.question;


    answerResult.textContent = "";


    nextQuestionButton.classList.add("hidden");


    answersContainer.innerHTML = "";


    question.answers.forEach(function(answer, index) {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer;


        button.addEventListener("click", function() {

            chooseAnswer(
                button,
                index,
                question.correct
            );

        });


        answersContainer.appendChild(button);

    });

}


/* Answer */

function chooseAnswer(
    selectedButton,
    selectedIndex,
    correctIndex
) {

    if (questionAnswered) {
        return;
    }


    questionAnswered = true;


    const allAnswerButtons =
        document.querySelectorAll(".answer-button");


    allAnswerButtons.forEach(function(button) {

        button.disabled = true;

    });


    if (selectedIndex === correctIndex) {

        selectedButton.classList.add("correct");

        answerResult.textContent =
            "✓ Correct. The friendship database approves.";

        gameScore++;

    } else {

        selectedButton.classList.add("wrong");

        allAnswerButtons[correctIndex]
            .classList.add("correct");

        answerResult.textContent =
            "✗ Not quite. But we'll allow it.";

    }


    nextQuestionButton.classList.remove("hidden");

}


/* Next question */

nextQuestionButton.addEventListener("click", function() {

    currentQuestion++;


    if (currentQuestion >= gameQuestions.length) {

        finishGame();

        return;

    }


    loadQuestion();

});


/* Finish */

function finishGame() {

    gameCard.classList.remove("active");

    gameComplete.classList.remove("hidden");

    gameComplete.querySelector("h2").textContent =
        "Score: " +
        gameScore +
        " / " +
        gameQuestions.length;

}


/* Continue */

gameContinueButton.addEventListener("click", function() {

    showPage(yourTurn);

    resetYourTurn();

});


/* Reset game */

function resetGame() {

    currentQuestion = 0;

    gameScore = 0;

    questionAnswered = false;

    gameCard.classList.remove("active");

    gameComplete.classList.add("hidden");

    startGameButton.classList.remove("hidden");

    answerResult.textContent = "";

}


/* =========================================================
   YOUR TURN
========================================================= */

const yourQuestionNumber =
    document.querySelector(".your-question-number");

const yourQuestionTitle =
    document.querySelector(".your-question h2");

const yourAnswer =
    document.getElementById("yourAnswer");

const yourNextButton =
    document.getElementById("yourNextButton");

const yourTurnComplete =
    document.getElementById("yourTurnComplete");

const secretChapterButton =
    document.getElementById("secretChapterButton");


const yourQuestions = [

    "What was your first impression of me?",

    "At what point did you realize, \"Okay, we're actually friends now\"?",

    "What's one thing about our friendship you didn't expect?",

    "What's one conversation between us that you remember for some reason?",

    "And finally... what do you think of this entire ridiculous website?"

];


let currentYourQuestion = 0;


/* Load Your Turn question */

function loadYourTurnQuestion() {

    yourQuestionNumber.textContent =
        "QUESTION " +
        String(currentYourQuestion + 1).padStart(2, "0");


    yourQuestionTitle.textContent =
        yourQuestions[currentYourQuestion];


    yourAnswer.value = "";

}


/* Next */

yourNextButton.addEventListener("click", async function() {

    /*
        For now the answers are stored only
        in this browser session.

        Later we can add Firebase / Supabase
        if you want her answers to be saved.
    */

    const answer =
        yourAnswer.value.trim();
    const question = yourQuestions[currentYourQuestion];
    const { error } = await supabaseClient
        .from("birthday_answers")
        .insert([
            {
                question_number: currentYourQuestion + 1,
                question: question,
                answer: answer
            }
        ]);

    if (error) {

        console.error("Failed to save answer:", error);

        alert("I couldn't save that answer. Please try again.");

        return;
    }    

    if (answer === "") {

        yourAnswer.placeholder =
            "You actually have to answer this one 😭";

        yourAnswer.focus();

        return;

    }


    currentYourQuestion++;


    if (currentYourQuestion >= yourQuestions.length) {

        document
            .querySelector(".your-question")
            .classList.add("hidden");

        yourTurnComplete.classList.remove("hidden");

        scrollToTop();

        return;

    }


    loadYourTurnQuestion();

});


/* Reset */

function resetYourTurn() {

    currentYourQuestion = 0;

    document
        .querySelector(".your-question")
        .classList.remove("hidden");

    yourTurnComplete.classList.add("hidden");

    loadYourTurnQuestion();

}


/* =========================================================
   SECRET CHAPTER
========================================================= */

secretChapterButton.addEventListener("click", function() {

    showPage(secret);

});


/* Diagnostic */

const diagnosticButton =
    document.getElementById("diagnosticButton");

const diagnosticResults =
    document.getElementById("diagnosticResults");


diagnosticButton.addEventListener("click", function() {

    diagnosticButton.disabled = true;

    diagnosticButton.textContent =
        "RUNNING DIAGNOSTICS...";


    setTimeout(function() {

        diagnosticResults.classList.remove("hidden");

        diagnosticButton.classList.add("hidden");

    }, 900);

});


/* =========================================================
   FINAL LETTER
========================================================= */

const finalLetterButton =
    document.getElementById("finalLetterButton");

finalLetterButton.addEventListener("click", function() {

    showPage(finalLetter);

});


/* =========================================================
   BIRTHDAY
========================================================= */

const birthdayButton =
    document.getElementById("birthdayButton");


birthdayButton.addEventListener("click", function() {

    showPage(birthdayEnding);

});


/* =========================================================
   REPLAY
========================================================= */

const replayButton =
    document.getElementById("replayButton");


replayButton.addEventListener("click", function() {

    resetGame();

    resetYourTurn();

    diagnosticResults.classList.add("hidden");

    diagnosticButton.classList.remove("hidden");

    diagnosticButton.disabled = false;

    diagnosticButton.textContent =
        "RUN DIAGNOSTICS";


    showPage(opening);

});

/* =========================================
   BIRTHDAY CANDLE POPUP
========================================= */

const candlePopup = document.getElementById("candlePopup");
const closeCandlePopup = document.getElementById("closeCandlePopup");
const blowCandlesButton = document.getElementById("blowCandlesButton");
const candleMessage = document.getElementById("candleMessage");

const flames = document.querySelectorAll(".flame");


function showCandlePopup() {

    if (!candlePopup) return;

    candlePopup.classList.remove("hidden");

}


if (closeCandlePopup) {

    closeCandlePopup.addEventListener("click", function () {

        candlePopup.classList.add("hidden");

    });

}


if (blowCandlesButton) {

    blowCandlesButton.addEventListener("click", function () {

        flames.forEach(function (flame, index) {

            setTimeout(function () {

                flame.classList.add("out");

            }, index * 150);

        });

        candleMessage.textContent = "Happy Birthday! 🎂✨";

        candlePopup.classList.add("finished");

        setTimeout(function () {

            // Keep popup visible for the moment.

        }, 800);

    });

}


