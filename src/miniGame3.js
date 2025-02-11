import '../style/trivia.css';

export function startTriviaGame() {
    return new Promise((resolve, reject) => {
        const contentContainer = document.getElementById('contentContainer');
        contentContainer.innerHTML = `
            <div id="triviaGame" class="trivia-container">
                <h2 class="game-title">The Meaning of Forever</h2>
                <div id="questionsContainer"></div>
            </div>
        `;

        const questionsContainer = document.getElementById('questionsContainer');

        const questions = [
            {
                question: "Apa arti persahabatan bagimu?",
                choices: [
                    "Teman hanya ada saat bahagia.",
                    "Saling mendukung dalam suka dan duka.",
                    "Hanya untuk menghabiskan waktu bersama."
                ],
                correctAnswer: 1
            },
            {
                question: "Jika waktu dapat diulang, apa yang akan kamu lakukan berbeda?",
                choices: [
                    "Menghindari kesalahan dan tantangan.",
                    "Memanfaatkan waktu untuk lebih menghargai orang lain.",
                    "Menyalahkan diri atas masa lalu."
                ],
                correctAnswer: 1
            },
            {
                question: "Mengapa komunikasi penting dalam hubungan?",
                choices: [
                    "Untuk menghindari konflik.",
                    "Untuk menyampaikan pikiran dan saling memahami.",
                    "Hanya formalitas."
                ],
                correctAnswer: 1
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;

        function displayQuestion(index) {
            const questionData = questions[index];
            questionsContainer.innerHTML = `
                <p class="question">${index + 1}. ${questionData.question}</p>
                <div id="choicesContainer"></div>
            `;

            const choicesContainer = document.getElementById('choicesContainer');
            questionData.choices.forEach((choice, choiceIndex) => {
                const choiceButton = document.createElement('button');
                choiceButton.textContent = choice;
                choiceButton.classList.add('choiceButton');
                choiceButton.addEventListener('click', () => {
                    handleAnswer(choiceIndex === questionData.correctAnswer);
                });
                choicesContainer.appendChild(choiceButton);
            });
        }

        function handleAnswer(isCorrect) {
            if (isCorrect) {
                score++;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion(currentQuestionIndex);
            } else {
                endTriviaGame();
            }
        }

        function endTriviaGame() {
            contentContainer.innerHTML = '<div id="triviaGame"></div>';
            
            if (score === questions.length) {
                resolve(); // ✅ Langsung resolve tanpa tombol lanjutkan
            } else if (score > 0) {
                // contentContainer.innerHTML += `<p class="false-message">Kamu menjawab sebagian dengan benar. Cobalah lebih memahami!</p>`;
                resolve(); // ✅ Tetap lanjut meskipun skor tidak sempurna
            } else {
                // contentContainer.innerHTML += `<p class="result-message">Kamu tidak menjawab dengan benar. Coba lagi!</p>`;
                const retryButton = document.createElement('button');
                retryButton.textContent = 'Try Again';
                retryButton.classList.add('retryButton');
                retryButton.addEventListener('click', () => startTriviaGame());
                contentContainer.appendChild(triviaGame);
                triviaGame.appendChild(retryButton);
            }
        }

        displayQuestion(currentQuestionIndex);
    });
}
