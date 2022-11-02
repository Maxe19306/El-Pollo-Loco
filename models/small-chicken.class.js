class SmallChicken extends MovableObject {
    position_y = 350;
    height = 100;
    width = 70;
    energy = 5;
    Correction_position_x = 10;
    Correction_position_y = 10;
    Correction_width = 15;

    allIntervall = [];
    dead_Sound = new Audio('audio/chicken.mp3');
    Correction_height = 10;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    currentImage = 0;


    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed_x = 0.2 + Math.random() * 4;
        this.position_x = 200 + Math.random() * 2000;
        this.animate();
    }



    /**
     * this function animates the chicken and determines which image and which direction is correct.
     * 
     */
    animate() {
        this.setStoppableInterval(() => {
            this.DirectionUpdateEnemy()
        }, 100);

        this.setStoppableInterval(() => {
            this.ImageUpdate()
        }, 100);
    }

    /**
     *  this function updates the displayed images of the object.
     * 
     */
    ImageUpdate() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.stopIntervall();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


}