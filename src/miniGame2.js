import '../style/wordDuel.css';
export function startWordDuel() {
    return new Promise((resolve, reject) => {
        const contentContainer = document.getElementById('contentContainer');

        if (!contentContainer) {
            console.error('Elemen contentContainer tidak ditemukan!');
            reject('Content container is missing from DOM.');
            return;
        }

        let playerScore = 0;
        let npcScore = 0;
        let round = 1;
        const maxRounds = 5;

        const wordCategories = {
            emotions: ['happy', 'sad', 'angry', 'excited', 'nervous'],
            nature: ['tree', 'river', 'mountain', 'ocean', 'cloud'],
            concepts: ['freedom', 'justice', 'power', 'knowledge', 'wisdom'],
            objects: ['book', 'lamp', 'car', 'phone', 'chair'],
            animals: ['cat', 'dog', 'deer', 'skunk', 'fox'],
        };

        const allWords = Object.values(wordCategories).flat();
        const shuffledWords = [...allWords].sort(() => Math.random() - 0.5).slice(10);

        contentContainer.innerHTML = `
            <div id="wordDuelGame">
                <h2>Whispers Between the Lines</h2>
                <p>Memorize these words in <strong>10 seconds</strong>!</p>
                <p id="wordList">${shuffledWords.join(', ')}</p>
                <p>Time left: <span id="timer">10</span> seconds</p>
            </div>
        `;

        let timer = 10;
        const timerElement = document.getElementById("timer");
        const countdown = setInterval(() => {
            timer--;
            timerElement.textContent = timer;
            if (timer <= 0) {
                clearInterval(countdown);
                startMainGame();
            }
        }, 1000);

        function startMainGame() {
            let usedCategories = [];
            
            contentContainer.innerHTML = `
                <div id="wordDuelGame" class="word-duel-container">
                    <h2>Whispers Between the Lines</h2>
                    <div id="gameStatus">Round 1</div>
                    <div id="scores">
                        <span>Player: <span id="playerScore">0</span></span>
                        <span>NPC: <span id="npcScore">0</span></span>
                    </div>
                    <div id="wordArena">
                        <p>Category: <strong id="currentCategory"></strong></p>
                        <input type="text" id="playerInput" placeholder="Enter a word" autofocus />
                        <button id="submitWord">Submit</button>
                    </div>
                    <div id="npcResponse"></div>
                    <div id="gameOverMessage"></div>
                    <button id="retryButton" style="display: none;">Try Again</button>
                </div>
            `;

            const playerInput = document.getElementById('playerInput');
            const submitWordButton = document.getElementById('submitWord');
            const npcResponseDiv = document.getElementById('npcResponse');
            const playerScoreSpan = document.getElementById('playerScore');
            const npcScoreSpan = document.getElementById('npcScore');
            const gameStatus = document.getElementById('gameStatus');
            const currentCategorySpan = document.getElementById('currentCategory');
            const gameOverMessage = document.getElementById('gameOverMessage');
            const retryButton = document.getElementById('retryButton');

            playerInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submitWordButton.click();
                }
            });
            
            submitWordButton.addEventListener("keydown", (event) => {
                if (event.key === "Tab") {
                    event.preventDefault();
                    playerInput.focus();
                }
            });

            function getRandomCategory() {
                const categories = Object.keys(wordCategories).filter(cat => !usedCategories.includes(cat));
                if (categories.length === 0) usedCategories = [];
                const category = categories[Math.floor(Math.random() * categories.length)];
                usedCategories.push(category);
                return category;
            }

            function getNPCGuess(category) {
                const words = wordCategories[category];
                const chance = Math.random();
                return chance < 0.7 ? words[Math.floor(Math.random() * words.length)] : "*wrong word";
            }

            function playRound() {
                if (round > maxRounds) {
                    endGame();
                    return;
                }

                const category = getRandomCategory();
                currentCategorySpan.textContent = category;

                submitWordButton.onclick = () => {
                    const playerWord = playerInput.value.trim().toLowerCase();
                    let playerCorrect = wordCategories[category].includes(playerWord);

                    if (playerCorrect) {
                        playerScore++;
                        playerScoreSpan.textContent = playerScore;
                    }

                    const npcWord = getNPCGuess(category);
                    let npcCorrect = wordCategories[category].includes(npcWord);

                    setTimeout(() => {
                        npcResponseDiv.textContent = `Unknown Lady says: "${npcWord}"`;
                        if (npcCorrect) {
                            npcScore++;
                            npcScoreSpan.textContent = npcScore;
                        }

                        round++;
                        if (round <= maxRounds) {
                            gameStatus.textContent = `Round ${round}`;
                            playerInput.value = '';
                            playRound();
                        } else {
                            endGame();
                        }
                    }, 1000);
                };
            }

            function endGame() {
                if (playerScore > npcScore || (playerScore === maxRounds)) {
                    resolve("🎉 You win the Word Duel!");
                } else if (npcScore > playerScore) {
                    gameOver("Unknown Lady wins! Better luck next time.");
                } else { 
                    resolve("It's a tie!");
                }
            }

            function gameOver(message) {
                gameOverMessage.innerHTML = `<p>${message}</p>`;
                retryButton.style.display = "block";
                submitWordButton.disabled = true;
                retryButton.addEventListener('click', () => startWordDuel());
            }

            playRound();
        }
    });
}
