export function setupUI() {
    // Menampilkan tombol untuk memulai game
    const startButton = document.getElementById("startGameBtn");
    
    // Event listener untuk mulai game ketika tombol di-klik
    startButton.addEventListener("click", () => {
        startButton.style.display = "none"; // Sembunyikan tombol setelah di-klik
        startGame(); // Memulai game (diambil dari game.js)
    });
    
    const messageDiv = document.getElementById("message");
}

// Menampilkan pesan dalam div
export function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}

// Fungsi untuk menampilkan pesan akhir
export function showEndMessage(message) {
    const gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.textContent = message;

    const retryButton = document.getElementById("retryButton");
    retryButton.style.display = "block";  // Menampilkan tombol retry
    
    retryButton.addEventListener("click", () => {
        window.location.reload(); // Memulai ulang game
    });
}

