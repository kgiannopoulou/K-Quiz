const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

startBtn.onclick = () => {
    popupInfo.classList.remove('active'); // Hide the popup
    main.classList.remove('active'); // Hide the main section
    quizSection.classList.add('active'); // Show quiz section
    quizBox.classList.add('active'); // Show quiz box

    showQuestions(questionCount); // Show the first question
    questionCounter(questionNumb); // Update question counter
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox(); // Show the result box
        showRecommendation(); // Show the recommendation based on answers
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = "";
    questions[index].options.forEach((option) => {
        optionTag += `<div class="option"><span>${option}</span></div>`;
    });

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

      // Store the index of the selected answer
      let selectedIndex = Array.from(optionList.children).indexOf(answer);
      storeAnswer(questionCount, selectedIndex);  // Store user's selected answer

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function showRecommendation() {
    const recommendation = getRecommendation(userAnswers);  // Get matched recommendation
    const resultElement = document.querySelector(".result-container");

    if (recommendation) {
        resultElement.innerHTML = `
            <h2>Your Kdrama Recommendation is: "${recommendation.title}"</h2>
            <img src="${recommendation.poster}" alt="${recommendation.title} Poster" class="drama-poster" />
            <p><strong>Genre:</strong> ${recommendation.genre}</p>
            <p><strong>Description:</strong> ${recommendation.description}</p>
        `;
    } else {
        resultElement.innerHTML = "<h2>Sorry, we couldn't find a match!</h2>";
    }

    // Show result box and hide quiz box
    document.querySelector(".result-box").style.display = "block";
    document.querySelector(".quiz-box").style.display = "none";
}


function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
}


