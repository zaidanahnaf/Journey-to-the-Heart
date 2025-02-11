import '../style/memoryPuzzle.css';

export function startMemoryPuzzle() {
    return new Promise((resolve, reject) => {
        const contentContainer = document.getElementById('contentContainer');
        contentContainer.innerHTML = `
            <div id="gameContainer" style="text-align: center;">
                <h2 style="text-align: center;">Echoes of the Heart</h2>
                <div id="timerDisplay" style="font-size: 20px; margin-top: 10px;">Time Left: 20s</div>
                <div id="cardsContainer" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px;"></div>
                <div id="message" style="margin-top: 20px;"></div>
                <div id="gameOverMessage" style="margin-top: 20px;"></div>
                <button id="retryButton" style="display: none;">Try Again</button>
            </div>
        `;

        const cards = [
            { id: 'fanta', image: '../public/assets/icons/soda.png' },
            { id: 'fanta', image: '../public/assets/icons/soda.png' },
            { id: 'iceCream', image: '../public/assets/icons/iceCream.png' },
            { id: 'iceCream', image: '../public/assets/icons/iceCream.png' },
            { id: 'theater', image: '../public/assets/icons/theater.png' },
            { id: 'theater', image: '../public/assets/icons/theater.png' },
        ];

        const shuffledCards = cards.sort(() => Math.random() - 0.5);
        const cardsContainer = document.getElementById('cardsContainer');
        const timerDisplay = document.getElementById('timerDisplay');
        const gameOverMessage = document.getElementById('gameOverMessage');
        const retryButton = document.getElementById('retryButton');

        shuffledCards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"><img src="../public/assets/card/cardLogo.png"></div>
                    <div class="card-back"><img src="${card.image}" alt="${card.id}"></div>
                </div>
            `;
            cardElement.dataset.id = card.id;

            cardElement.addEventListener('click', () => handleCardClick(cardElement));
            cardsContainer.appendChild(cardElement);
        });

        let firstCard = null;
        let secondCard = null;
        let matchedPairs = 0;
        let timeLeft = 20;
        let gameOver = false;

        const timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleGameOver();
            } else {
                timeLeft--;
                timerDisplay.textContent = `Time Left: ${timeLeft}s`;
            }
        }, 1000);

        function handleCardClick(card) {
            if (gameOver || card.classList.contains('flipped') || secondCard) return;

            card.classList.add('flipped');

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                if (firstCard.dataset.id === secondCard.dataset.id) {
                    matchedPairs++;
                    resetSelection();
                    if (matchedPairs === cards.length / 2) {
                        clearInterval(timer);
                        resolve(); // ✅ Langsung resolve tanpa tombol lanjutkan
                    }
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        resetSelection();
                    }, 1000);
                }
            }
        }

        function resetSelection() {
            firstCard = null;
            secondCard = null;
        }

        function handleGameOver() {
            gameOver = true;
            // gameOverMessage.innerHTML = `<h2>Game Over! Time's up!</h2>`;
            retryButton.style.display = "block";

            // Hapus kartu dari tampilan saat game over
            cardsContainer.innerHTML = "";

            retryButton.addEventListener('click', () => startMemoryPuzzle());
        }
    });
}
