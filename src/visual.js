import '../style/visual.css';

export async function showSurpriseBubble() {
    return new Promise((resolve) => {
        const canvasContainer = document.getElementById('contentContainer'); // Gunakan pembungkus karakter
        if (!canvasContainer) {
            console.error("Elemen canvasContainer tidak ditemukan.");
            resolve();
            return;
        }

        const audio = new Audio('./assets/sounds/alert.mp3');

        // Buat container bubble chat
        const bubbleContainer = document.createElement('div');
        bubbleContainer.classList.add('surprise-bubble');

        // Buat awan obrolan sebagai elemen gambar
        const bubble = document.createElement('img');
        bubble.src = './assets/icons/bubbleChat.png'; // Pastikan path benar
        bubble.classList.add('speech-bubble');
        bubble.textContent = "!?";

        // Buat tanda seru sebagai elemen gambar
        const exclamation = document.createElement('img');
        exclamation.src = './assets/icons/warning1.png';
        exclamation.classList.add('exclamation-mark');

        // Masukkan tanda seru ke dalam bubble
        bubbleContainer.appendChild(bubble);
        bubble.appendChild(exclamation); // Tanda seru di dalam bubble
        canvasContainer.appendChild(bubbleContainer); // Masukkan bubble ke dalam karakter

        // **Mainkan efek suara**
        audio.play();

        // Animasi tanda seru (efek pop-up kecil)
        exclamation.style.transform = 'scale(0)';
        setTimeout(() => {
            exclamation.style.transition = 'transform 0.2s ease-out';
            exclamation.style.transform = 'scale(1)';
        }, 100);

        // Hapus setelah 2 detik
        setTimeout(() => {
            bubbleContainer.remove();
            resolve();
        }, 2000);
    });
}
