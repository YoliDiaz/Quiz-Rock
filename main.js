const questions = [
    {
        id:1,
        questions: "1 ¿Quién es conocido como El Rey del Rock?",
        answers: ["Bob Dylan", "Elvis Presley", "Mick Jagger", "Bruce Springsteen"],
        correctAnswer:"Elvis Presley",
    },

    {
        id:2,
        questions: "2 ¿Cuál fue el álbum debut de la banda Nirvana?",
        answers: ["Nevermind", "Bleach", "In Utero", "MTV Unpligged in New York"],
        correctAnswer:"Bleach",
    },

    {
        id:3,
        questions: "3 ¿Qué banda escribió la canción de Bohemian Rhapsody?",
        answers: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
        correctAnswer:"Queen",
    },

    {
        id:4,
        questions: "4 ¿Cuál de las siguientes bandas es originaria de Australia?",
        answers: ["AC/DC", "Metallica", "The Rolling Stones", "The Doors"],
        correctAnswer:"AC/DC",
    },

    {
        
        id:5,
        questions: "5 ¿Cuál fue el nombre del guitarrista principal de la banda Led Zeppelin?",
        answers: ["Jimmi Hendrix", "Jimmy Page", "Eric Clapton", "Keith Richards"],
        correctAnswer:"Jimmy Page",
        
    },

    {
        id:6,
        questions: "6 ¿Cuál es el apodo de la banda The Rolling Stones?",
        answers: ["The Fab Four", "The Bad Boys of Rock", "The World s Greates Rock and Roll Band", "The Godfathers of Metal"],
        correctAnswer:"The World s Greates Rock and Roll Band",   
    },

    {
        id:7,
        questions: "7 ¿Cuál de estos álbumes pertenece a The Beatles?",
        answers: ["Let It Bleed", "The Wall", "Abbey Road", "Sticky Fingers"],
        correctAnswer:"Abbey Road",
    },

    {
        id:8,
        questions: "8 ¿En qué ciudad se originó en movimiento grunge?",
        answers: ["New York", "Los Angeles", "Seattle", "Chicago"],
        correctAnswer:"Seattle",
    },

    {
        id:9,
        questions: "9 ¿Cuál de estas canciones es de la banda Metallica?",
        answers: ["Smoke on the Water", "Enter Sandman", "We Will Rock You", "Hotel California"],
        correctAnswer:"Enter Sandman",
    },

    {
        id:10,
        questions: "10 ¿Quién fue el cantante principal de la banda The Doors?",
        answers: ["Roger Waters", "Jim Morrison", "Freddie Mercury", "Steven Tyler"],
        correctAnswer:"Jim Morrison",
    }
];

let currentQuestion = 0;
let isAnswered = false

const title = document.getElementById("question");
const answers = document.getElementById("answers");
const infoQuestion = document.getElementById("infoQuestion");
const btnNext = document.getElementById("btnNext");

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
    
        const bgColor = answer == currentCorrectAnswer ? "bg-green-500" : "bg-red-500";

        document.getElementById(btnId).classList.remove("bg-slate-200");
        document.getElementById(btnId).classList.add(bgColor);

    }
    
}

function nextQuestion() {
    if (isAnswered) {
        currentQuestion++;
        isAnswered = false;
        console.log(currentQuestion);
        printQuestion();
    }
}

function printInfoQuestion() {
    infoQuestion.innerText =`Pregunta ${currentQuestion + 1} de ${questions.length}`;
} 

printQuestion();