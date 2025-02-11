import '../style/credit.css';

export function startCredits() {
    return new Promise((resolve) => {
        const contentContainer = document.getElementById("contentContainer");

        if (!contentContainer) {
            console.error("Content container not found!");
            resolve();
            return;
        }

        // Fade out seluruh konten sebelumnya
        contentContainer.style.transition = "opacity 2s";
        contentContainer.style.opacity = 0;

        setTimeout(() => {
            // Setelah fade-out, hapus semua elemen sebelumnya dan buat Credit Scene
            contentContainer.innerHTML = `
                <div id="creditsContainer" class="credits-container">
                    <div id="creditsText" class="credits-text">
                        <h2>Journey to the Heart</h2>
                        <p>Created by Dhafa</p>
                        <p>Story & Script by Dhafa</p>
                        <p>Character Design: Dhafa</p>
                        <p>Programming: Dhafa</p>
                        <p id="doc">Documentations:
                            <img src="../public/assets/photo/d1.jpg" alt="d1">
                            <img src="../public/assets/photo/d2.jpg" alt="d2">
                            <img src="../public/assets/photo/d3.jpg" alt="d3">
                        </p>
                        <p>Special Thanks to Sali</p>
                        <p>Dedicated to someone special</p>
                        <p>Thank you for playing!</p>
                    </div>
                    <p id="restartText" class="restart-text hidden">Can we start over?</p>
                    <button id="returnButton" class="return-button hidden">Return to Main Menu</button>
                </div>
            `;

            // Kembalikan opacity agar credit bisa terlihat
            contentContainer.style.opacity = 1;

            // Animasi scrolling credit
            const creditsText = document.getElementById("creditsText");
            creditsText.style.animation = "scrollUp 20s linear forwards";

            // Tampilkan teks "Can we start over?" setelah kredit berjalan
            setTimeout(() => {
                const restartText = document.getElementById("restartText");
                restartText.classList.remove("hidden");
                restartText.style.animation = "fadeIn 3s forwards";
            }, 15000); // Muncul setelah 15 detik

            // Tampilkan tombol kembali setelah teks "Can we start over?" muncul
            setTimeout(() => {
                const returnButton = document.getElementById("returnButton");
                returnButton.classList.remove("hidden");
                returnButton.style.animation = "fadeIn 2s forwards";

                returnButton.addEventListener("click", () => {
                    contentContainer.style.transition = "opacity 1.5s";
                    contentContainer.style.opacity = 0;

                    setTimeout(() => {
                        resolve(); // Kembali ke main menu setelah fade-out
                    }, 1500);
                });
            }, 18000); // Tombol muncul setelah teks fade-in (18s total)
        }, 2000); // Fade out selama 2 detik sebelum menampilkan kredit
    });
}
