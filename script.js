const questions = [
    {
        question: "What does HTTP stand for?",
        answers: [
            { text: "Hyper Text Transfer Protocol", correct: true },
            { text: "Hyper Transfer Text Protocol", correct: false },
            { text: "High Text Transfer Program", correct: false },
            { text: "Hyperlink Text Transfer Protocol", correct: false }
        ]
    },
    {
        question: "Which of these is an operating system?",
        answers: [
            { text: "Windows", correct: true },
            { text: "Google", correct: false },
            { text: "Facebook", correct: false },
            { text: "Twitter", correct: false }
        ]
    },
    
        {
        question :"Which programming language is often used for web design?",
        answers:[
            
                {text:"Excel", correct: false },
                {text:"Photoshop", correct: false },
                {text:"PowerPoint", correct: false },
               { text:"HTML", correct: true },
        ]
    }, 

    
    {
        question :"Deep learning is a subfield of…",
        answers:[
            
                {text:"Database Management", correct: false },
                {text:"Artificial Intelligence (AI)", correct: true },
                {text:"Computer Networks", correct: false },
               { text:"Cyber Security", correct: false },
        ]
    }, 

    {
        question :"What does CNN stand for in deep learning?",
        answers:[
            
                {text:"Convolutional Neural Network", correct: true },
                {text:"Central Neural Node", correct: false },
                {text:"Connected Neural Network", correct: false },
               { text:"Computed Network Node", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
