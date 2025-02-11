import '../style/gift.css'

export function startGiftReveal() {
    return new Promise((resolve) => {
        const contentContainer = document.getElementById("contentContainer");

        if (!contentContainer) {
            console.error("Game container not found!");
            resolve();
            return;
        }

        // Setup UI
        contentContainer.innerHTML = `
            <h2>Your Gift Awaits</h2>
            <div id="giftContainer" class="gift-container">
                <div id="paperLayer" class="paper-layer">
                    <div class="revealText">Click to reveal...</div>
                </div>
                <div id="photoContainer" class="photo-container hidden">
                    <div id="photoCard" class="photo-card">
                        <div class="photo-front">
                            <img src="../public/assets/gift/couple.jpg" alt="Dhafa and Sali">
                            <div class="rotateText">Click again to rotate...</div>
                            </div>
                        <div class="photo-back">
                            <p>Happy birthday Sali,</p>
                            <p>May the years ahead be as gentle to you as you are to those you cherish</p>
                        </div>
                    </div>
                </div>
                <div id="gachaOverlay" class="gacha-overlay hidden">
                    <div class="gacha-box">
            
                        <h3>Congrats! You obtain "Unwritten Bond Keychain"!</h3>
                        <img id="gachaPrize" src="../public/assets/gift/keychain.png" alt="Keychain">
                        <button id="closeGacha">Close</button>
                    </div>
                </div>
            </div>
        `;

        const paperLayer = document.getElementById("paperLayer");
        const photoContainer = document.getElementById("photoContainer");
        const photoCard = document.getElementById("photoCard");
        const gachaOverlay = document.getElementById("gachaOverlay");
        const closeGacha = document.getElementById("closeGacha");
        closeGacha.addEventListener("click", () => {
            gachaOverlay.classList.add("hidden");
            resolve();
        });

        let isRevealed = false;
        let isFlipped = false;

        // Tambahkan efek suara (Opsional)
        const openSound = new Audio("../public/assets/sounds/openLetter.mp3");
        const flipSound = new Audio("../public/assets/sounds/flipCard.mp3");
        const gachaSound = new Audio("../public/assets/sounds/gacha.mp3");

        // Event: Membuka surat untuk melihat foto
        paperLayer.addEventListener("click", () => {
            if (isRevealed) return;

            openSound.play(); // Mainkan suara saat surat dibuka

            paperLayer.style.animation = "openLetter 1s forwards"; // Animasi surat terbuka

            setTimeout(() => {
                paperLayer.style.display = "none";
                photoContainer.classList.remove("hidden");
                photoContainer.style.animation = "fadeInZoom 1s ease-out"; // Animasi foto muncul
            }, 1000);

            isRevealed = true;
        });

        // Event: Klik foto untuk memutar dan melihat bagian belakang
        photoCard.addEventListener("click", () => {
            flipSound.play(); // Mainkan suara flip kartu
            if (!isFlipped) {
                photoCard.classList.add("flipped"); // Tambah efek rotasi
                isFlipped = true;
            } else {
                photoContainer.classList.add("hidden");
                gachaOverlay.classList.remove("hidden");
                gachaSound.play(); // Mainkan suara gacha
            }
        });

        // Event: Tutup hadiah kedua dan lanjutkan ke program selanjutnya
        function closeGachaMenu() {
            gachaOverlay.classList.add("hidden");
            resolve();
        }

        closeGacha.addEventListener("click", closeGachaMenu);
    });
}
