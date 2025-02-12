export class SpriteAnimator {
    constructor(imageSrc, frameCount, canvasId, frameDelay = 100) {
        // Inisialisasi properti
        this.image = new Image();
        this.frameCount = frameCount;
        this.currentFrame = 0;
        this.frameDelay = frameDelay;
        this.animationInterval = null;
        
        // Setup canvas
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Load gambar
        this.image.onload = () => {
            // Set ukuran canvas sesuai frame size
            this.frameWidth = this.image.width / this.frameCount;
            this.frameHeight = this.image.height;
            this.canvas.width = this.frameWidth;
            this.canvas.height = this.frameHeight;
            
            // Mulai animasi
            this.startAnimation();
        };
        this.image.src = imageSrc;
    }

    startAnimation() {
        this.animationInterval = setInterval(() => {
            this.updateFrame();
        }, this.frameDelay);
    }

    updateFrame() {
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.image,
            this.currentFrame * this.frameWidth, // Sumber X
            0, // Sumber Y
            this.frameWidth, // Lebar frame
            this.frameHeight, // Tinggi frame
            0, // Tujuan X
            0, // Tujuan Y
            this.frameWidth, // Lebar render
            this.frameHeight // Tinggi render
        );
    }
}

// Contoh penggunaan untuk 23 frame
const animator23 = new SpriteAnimator(
    '/public/assets/characters/dhafa2d.png', // Ganti dengan path gambar
    23,
    'spriteDhafa',
    80 // Delay lebih lambat untuk 23 frame
);

// Contoh penggunaan untuk 9 frame
// const animator9 = new SpriteAnimator(
//     '../public/assets/characters/sali2d.png', // Ganti dengan path gambar
//     9,
//     'spriteSali',
//     150 // Delay lebih cepat untuk 9 frame
// );
