import '../style/main.css';
import '../style/dialog.css';
import { showSurpriseBubble } from "./visual";
import { startTextDialog } from './dialog.js';
import { SpriteAnimator } from "./spriteAnimation.js";
import { startMemoryPuzzle } from './miniGame1.js';
import { startWordDuel } from './miniGame2.js';
import { startTriviaGame } from './miniGame3.js';
import { startGiftReveal } from './giftReveal.js';
import { startCredits } from './credit.js';
import { startCutsceneSaliEnter, startCutsceneSaliExit } from './cutscene.js';

document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('contentContainer');

    contentContainer.innerHTML = `
        <button id="startGameBtn">Start</button>
    `;

    document.getElementById('startGameBtn').addEventListener('click', async () => {
        document.getElementById('startGameBtn').style.display = 'none';  // Sembunyikan tombol, jangan hapus dulu
        try {
            await startGame();  // Jalankan game
        } catch (error) {
            console.error("Terjadi kesalahan dalam startGame():", error);
            alert("Terjadi kesalahan. Coba refresh halaman.");
        }
    });
});

async function startGame() {
    const menuAudio = document.querySelector('audio');
    if (menuAudio) {
        menuAudio.pause();
        menuAudio.currentTime = 0;
    }

    const gameTitle = document.getElementById('gameTitle');
    if (gameTitle) {
        gameTitle.style.display = 'none';
    }

    const gameAudio = new Audio('/public/assets/sounds/likeHim.mp3');
    gameAudio.loop = true;
    gameAudio.volume = 0;
    gameAudio.play();

    let volume = 0;
    const fadeDuration = 10000; // 10 detik
    const stepTime = 100; // Naik setiap 100ms
    const stepSize = 1 / (fadeDuration / stepTime); // Hitung kenaikan volume per step

    const fadeIn = setInterval(() => {
        if (volume < 1) {
            volume += stepSize; 
            gameAudio.volume = Math.min(volume, 1); // Pastikan tidak lebih dari 1
        } else {
            clearInterval(fadeIn); // Hentikan setelah mencapai 1
        }
    }, stepTime);

    console.log('Load Success...');
    
    try {
        await startTextDialog("prologue1");  // Dialog Prolog
    } catch (error) {
        console.log("monolog tidak muncul");
        return;
    }

    // try {
    //     await showSurpriseBubble();
    //     console.log("efek kaget dieksekusi");
    // } catch (error) {
    //     console.log("Error di notifikasi kaget");
    // }

    // try {
    //     await startCutsceneSaliEnter();  // Tunggu animasi selesai
    //     console.log("Cutscene selesai, memulai dialog...");
    // } catch (error) {
    //     console.error("Error di startCutsceneSaliEnter:", error);
    //     return;
    // }

    // try {
    //     startSpriteAnimation();  // Memulai animasi sprite in-game
    //     console.log("Mulai animasi in-game...");
    //     await startTextDialog("prologue2");  // Dialog Prolog
    // } catch (error) {
    //     console.error("Error di startTextDialog('prologue'):", error);
    //     return;
    // }

    // try {
    //     await startTextDialog("puzzle1");  // Dialog Prolog
    //     await startMemoryPuzzle();
    //     await startTextDialog("puzzle2");  // Dialog Prolog
    // } catch (error) {
    //     console.error("Error di startTextDialog('prologue'):", error);
    //     return;
    // }
    // try {
    //     await startTextDialog("word1");  // Dialog Prolog
    //     await startWordDuel();
    //     await startTextDialog("word2");  // Dialog Prolog
    // } catch (error) {
    //     console.error("Error di startTextDialog('prologue'):", error);
    //     return;
    // }
    
    // try {
    //     await startTextDialog("trivia1");  // Dialog Prolog
    //     await startTriviaGame();
    //     await startTextDialog("trivia2");  // Dialog Prolog
    //     console.log("Mulai animasi in-game...");
    // } catch (error) {
    //     console.error("Error di startTextDialog('prologue'):", error);
    //     return;
    // }

    try {
        // await startTextDialog("epilogue");  // Dialog Epilog
        // await startCutsceneSaliExit();  // Cutscene Akhir
        await startTextDialog("epilogue2");  // Dialog Epilog
        await startTextDialog("epilogue3");  // Dialog Epilog
        await startGiftReveal();
        await startCredits();  // Credit Scene
        console.log("Credits selesai. Kembali ke main menu...");
    } catch (error) {
        console.error("Terjadi kesalahan dalam jalannya game:", error);
    }
}

function startSpriteAnimation() {
    try {
        // const menuSprite = document.querySelector('canvas');
        // if (menuSprite) {
        //     menuSprite.pause();
        //     menuSprite.currentTime = 0;
        // }
        // new SpriteAnimator('../public/assets/characters/dhafa2d.png', 23, 'spriteDhafa', 50);
        new SpriteAnimator('../public/assets/characters/sali2d.png', 9, 'spriteSali', 150);
        console.log("Sprite animation dimulai...");
    } catch (error) {
        console.error("Error saat memulai sprite animation:", error);
    }
}
