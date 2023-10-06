const questions = [
    {
        question: "Who is the Father of our Nation?",
        options: ["Mahatma Gandhi", "Dr. Rajendra Prasad", "Dr. B. R. Ambedkar", "Jawaharlal Nehru"],
        answer: "A"
    },
    {
        question: "Which attribute must have a unique value each time it is used in an HTML document?",
        options: ["Title", "Id", "Class", "Div"],
        answer: "B"
    },
    {
        question: "Variables declared with the let keyword have what type of scope?",
        options: ["function scope", "global scope", "inline scope", "block scope"],
        answer: "D"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
        answer: "B"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "B"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 10; // Time limit in seconds for each question

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart-btn");

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    resultElement.textContent = "";
    scoreElement.textContent = "Score: 0";
    timerElement.textContent = "";
    submitButton.disabled = false;
    nextButton.style.display = "none";
    restartButton.style.display = "none";
});
function displayQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = `Question ${currentQuestion + 1}: ${current.question}`;
    
    optionsElement.innerHTML = "";
    current.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="answer" value="${String.fromCharCode(65 + index)}">${String.fromCharCode(65 + index)}. ${option}`;
        optionsElement.appendChild(li);
    });
    

    startTimer();
    
    questionElement.classList.add("question-fade-in");
    optionsElement.classList.add("options-fade-in");
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
     timerElement.style.color="red"
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion()
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timer);
    
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;

    const userAnswer =selectedOption.value 
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
        resultElement.style.color="green"
    } else {
        resultElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        resultElement.style.color="red"
    }

    submitButton.disabled = true;
    nextButton.style.display = "block";
    questionElement.classList.remove("question-fade-in");
    optionsElement.classList.remove("options-fade-in");
    resultElement.classList.add("result-fade-in");
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        submitButton.disabled = false;
        nextButton.style.display = "none";
        resultElement.textContent = "";
        questionElement.classList.remove("question-fade-in");
        optionsElement.classList.remove("options-fade-in");
        resultElement.classList.remove("result-fade-in");
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";
    resultElement.textContent = `Your Score: ${score} out of ${questions.length}`;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = "";
    submitButton.disabled = true;
    nextButton.style.display = "none";
    restartButton.style.display = "block";
}

displayQuestion();

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
