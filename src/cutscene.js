import '../style/cutscene.css'
import { SpriteAnimator } from "./spriteAnimation.js"; // Impor animator idle

export class CutsceneCharacter {
    constructor(imageSrc, direction = "enter", canvasId) {
        this.image = new Image();
        this.image.src = imageSrc;

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas dengan ID '${canvasId}' tidak ditemukan. Pastikan elemen <canvas> ada di HTML.`);
        }
        this.ctx = this.canvas.getContext("2d");

        this.totalFrames = 9; // Frame berjalan
        // this.idleImageSrc = "../public/assets/characters/sali2d.png"; // Sprite idle
        this.idleFrames =0; // Jumlah frame idle
        this.currentFrame = 1;
        this.frameTimer = 0;
        this.animationSpeed = 0.09;

        this.direction = direction;
        this.x = direction === "enter" ? -150 : this.canvas.width + 150;
        this.y = this.canvas.height / 2 - 64;
        this.speed = 30;
        this.isMoving = true;

        this.targetX = direction === "enter" ? this.canvas.width / 1 - 150 : -200;
        this.hasFinished = false;
        this.frameWidth = 0;
        this.frameHeight = 0;
    }

    update(deltaTime) {
        if (this.isMoving) {
            this.frameTimer += deltaTime;
            if (this.frameTimer >= this.animationSpeed) {
                this.frameTimer = 0;
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
            }

            this.x += (this.direction === "enter" ? 1 : -1) * this.speed * deltaTime;

            if ((this.direction === "enter" && this.x >= this.targetX) || 
                (this.direction === "exit" && this.x <= this.targetX)) {
                this.isMoving = false;
                this.hasFinished = true;
                this.x = this.targetX;
                
                // **Ganti ke animasi idle**
                this.startIdleAnimation();
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.save(); // Simpan state canvas sebelum transformasi
    
        if (this.direction === "exit") {
            this.ctx.scale(-1, 1); // Flip secara horizontal
            this.ctx.drawImage(
                this.image,
                this.currentFrame * this.frameWidth, 0,
                this.frameWidth, this.frameHeight,
                Math.floor(-this.x - this.frameWidth), Math.floor(this.y), // Perbaiki posisi karena sudah di-flip
                this.frameWidth, this.frameHeight
            );
        } else {
            this.ctx.drawImage(
                this.image,
                this.currentFrame * this.frameWidth, 0,
                this.frameWidth, this.frameHeight,
                Math.floor(this.x), Math.floor(this.y),
                this.frameWidth, this.frameHeight
            );
        }
    
        this.ctx.restore(); // Pulihkan state canvas setelah transformasi
    }

    async load() {
        return new Promise(resolve => {
            this.image.onload = () => {
                this.frameWidth = this.image.width / this.totalFrames;
                this.frameHeight = this.image.height;
                resolve();
            };
        });
    }

    startIdleAnimation() {
        this.canvas.id = "spriteSali"; // Ubah ID canvas agar cocok dengan SpriteAnimator
        new SpriteAnimator(this.idleImageSrc, this.idleFrames, "spriteSali", 150);
    }

    stopIdleAnimation() {
        const idleCanvas = document.getElementById("spriteSali");
        if (idleCanvas) {
            idleCanvas.remove(); // Hapus canvas idle sebelum cutscene exit berjalan
        }
    }
}

export async function startCutsceneSaliEnter() {
    const character = new CutsceneCharacter('../public/assets/characters/saliJalan.png', "enter", 'cutsceneCanvas');
    const audio = new Audio('./assets/sounds/walk.mp3');
    await character.load();

    return new Promise(resolve => {
        let lastTime = performance.now();

        function animate(timestamp) {
            audio.play();
            const deltaTime = (timestamp - lastTime) / 800;
            lastTime = timestamp;

            character.update(deltaTime);
            character.draw();

            if (!character.hasFinished) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}


function ensureCanvasExists() {
    let canvas = document.getElementById("cutsceneCanvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "cutsceneCanvas";
        document.body.appendChild(canvas);
    }
    return canvas;
}

export async function startCutsceneSaliExit() {
    ensureCanvasExists(); // Pastikan canvas ada sebelum dipakai

    const character = new CutsceneCharacter('../public/assets/characters/saliJalan.png', "exit", 'cutsceneCanvas');
    character.load();

    character.stopIdleAnimation();

    return new Promise(resolve => {
        let lastTime = performance.now();

        function animate(timestamp) {
            const deltaTime = (timestamp - lastTime) / 1000;
            lastTime = timestamp;

            character.update(deltaTime);
            character.draw();

            if (!character.hasFinished) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}


