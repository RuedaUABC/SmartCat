let time = 10;
let score = 0;
let mistakes = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        document.getElementById('time').innerText = time;
        if (time <= 0 || mistakes >= 3) {
            endGame();
        }
    }, 1000);
}

function fetchQuestion() {
    fetch('/get_question')
        .then(response => response.json())
        .then(data => displayQuestion(data));
}

function displayQuestion(questionData) {
    document.getElementById('question').innerText = questionData.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option, questionData.answer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
        time += 5;
    } else {
        mistakes++;
    }
    document.getElementById('score').innerText = `Puntuación: ${score}`;
    
    if (time > 0 && mistakes < 3) {
        fetchQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Juego terminado. Puntuación final: ${score}`);
    fetch('/submit_score', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ score })
    }).then(() => window.location.href = '/');
}

window.onload = () => {
    startTimer();
    fetchQuestion();
};
