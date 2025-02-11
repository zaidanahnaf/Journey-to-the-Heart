export function startGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
  
    // Set the canvas size
    canvas.width = 800;
    canvas.height = 600;
  
    // Load assets
    const protagonistImg = new Image();
    protagonistImg.src = './assets/characters/protagonist.png';
  
    const background = new Image();
    background.src = './assets/background.png';
  
    // Draw the game screen
    function drawScreen() {
      // Draw background
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      
      // Draw protagonist character
      ctx.drawImage(protagonistImg, 100, 100);
    }
  
    // Game loop
    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScreen();
      requestAnimationFrame(gameLoop);
    }
  
    // Start the game loop
    gameLoop();

    let score = 0; // Skor dimulai dari 0

    // Fungsi untuk memperbarui skor di UI
    function updateScore() {
        const scoreDisplay = document.getElementById("scoreDisplay");
        scoreDisplay.textContent = "Score: " + score;
    }

    // Fungsi untuk menambah skor
    function increaseScore() {
        score += 10; // Menambah 10 skor
        updateScore();
    }

    // Contoh implementasi dalam game loop
    // Misalnya, player mengumpulkan item atau menyelesaikan tugas
    increaseScore();

}
  