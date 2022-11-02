class Coin extends MovableObject {
    position_y = 180;
    height = 180;
    width = 180;
    currentImage = 0;
    sound = new Audio('audio/CoinAudio.mp3')
    Correction_position_x = 60;
    Correction_position_y = 60;
    Correction_width = 120;
    Correction_height = 120;
    allIntervall = [];
    IMAGE_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE_COIN);
        this.position_x = 100 + Math.random() * 2800;
        this.animate();
    }

    /**
     * this function is responsible for the animation of the coin
     * 
     */
    animate() {
        this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGE_COIN)
        }, 500)
    }



}