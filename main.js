let questions = [];

const myHeaders = new Headers();
myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttaGhzcHNieWdxcWVkaXhtY2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNDI3NTQsImV4cCI6MjA1MzcxODc1NH0.ZHUWDNcl6dAcdxBjQSVL6hhHx_c17neAxt7Q8iWwiyk");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://kmhhspsbygqqedixmccy.supabase.co/rest/v1/questions", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    questions = result.sort(() => Math.random() - 0.5);
    questions = result;
    printQuestion();
    intervalID = setInterval(countdown, 1000);
  })
  .catch((error) => console.error(error));

let currentQuestion = 0;
let isAnswered = false;

const totalTimer = 30;
let timer = 30;
let intervalID; 

let score = 0;

const title = document.getElementById("question");
const answers = document.getElementById("answers");
const infoQuestion = document.getElementById("infoQuestion");
const btnNext = document.getElementById("btnNext");
const txtTimer = document.getElementById("txtTimer");
const progressBar = document.getElementById("progressBar");

function printQuestion() {

    title.innerText = questions[currentQuestion].questions;

    let questionAnswers = questions[currentQuestion].answers;

    questionAnswers.sort(() => Math.random() - 0.5);

    answers.innerHTML = "";

    questionAnswers.forEach((answer, index) => {
        answers.innerHTML +=  `<button 
        id="btn${index}"
        onclick="checkAnswer('${answer}', 'btn${index}')" 
        class="bg-slate-200 rounded-lg p-2.5 hover:bg-slate-800 hover:text-white transition-all"> 
        ${answer} 
        </button>`;
    });

    btnNext.disabled = true;

    printInfoQuestion();
}

function checkAnswer(answer, btnId) {
    if(!isAnswered) {
        isAnswered = true;

        btnNext.disabled = false;

        const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
    
        const isCorrect = answer == currentCorrectAnswer;
        if(isCorrect) {
            score += 10;
            localStorage.setItem("score", score);
        }
        console.log("SCORE", score);
        const bgColor = answer == currentCorrectAnswer ? "bg-green-500" : "bg-red-500";

        document.getElementById(btnId).classList.remove("bg-slate-200");
        document.getElementById(btnId).classList.add(bgColor);

    }
    
}

function nextQuestion() {
    if (isAnswered) {
        currentQuestion++;
        console.log("currentQuestion");
        if (currentQuestion == questions.length) {
            window.location = "/ranking.html";
        }

        isAnswered = false;
        console.log(currentQuestion);
        printQuestion();

        timer = totalTimer + 1;
        intervalID = setInterval(countdown, 1000);
    }
}

function printInfoQuestion() {
    infoQuestion.innerText =`Pregunta ${currentQuestion + 1} de ${questions.length}`;
} 



function countdown() {
    timer -= 1;
    console.log("timer", timer);
    txtTimer.innerText =`${timer}`;

    console.log("Se ha respondido? => ", isAnswered);

    progressBar.classList.replace("opacity-0", "opacity-100");

    const widthPercent = getPercent(timer);
    progressBar.style.width = `${widthPercent}%`;

    if(isAnswered || timer == 0) {
        clearInterval(intervalID);
        isAnswered = true;
        btnNext.desabled = false;

        if(timer == 0) {
            alert("Tiempo finalizado");
        }
    }
}

function getPercent(currentTime) {
    return (currentTime * 100) / totalTimer;
}