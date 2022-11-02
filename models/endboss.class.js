class Endboss extends MovableObject {
    speed_x = 0;
    position_y = -20;
    height = 500;
    width = 250;
    GameExit = false;
    allIntervall = [];
    win_sound = new Audio('audio/win.mp3');
    dead_Sound = new Audio('audio/chicken.mp3');
    position_x = 2800;
    Correction_position_x = 20;
    Correction_position_y = 80;
    Correction_width = 35;
    Correction_height = 120;
    energy = 25;

    allIntervall = [];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]
    currentImage = 0;

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * this function animates the endboss and determines which image and which direction is correct.
     * 
     */
    animate() {
        this.setStoppableInterval(() => {
            this.DirectionUpdateEnemy();
        }, 1000 / 10);

        this.setStoppableInterval(() => {
            this.ImageUpdate();
        }, 100)

    }


    /**
     *  this function updates the displayed images of the object.
     * 
     */
    ImageUpdate() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            if (playMusic) {
                this.win_sound.play();
            }
            setTimeout(() => {
                this.GameExit = true;
            }, 500);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT)
        } else if (world.character.position_x > 2200) {
            this.playAnimation(this.IMAGES_ALERT);
            this.speed_x = 20;
        } else if (this.otherDirection && world.character.position_x - 300 < this.position_x || world.character.position_x + 300 > this.position_x) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * this function updates the direction depending on whether the enemy is running left or right.
     * 
     */
    DirectionUpdateEnemy() {
        if (world.character.position_x < this.position_x) {
            this.moveLeft();
            this.objectsPeeksRight();
        } else {
            this.objectsPeeksLeft()
            this.moveRight();
        }
    }

}