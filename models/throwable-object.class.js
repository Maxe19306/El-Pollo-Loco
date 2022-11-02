class ThrowableObject extends MovableObject {
    Correction_position_x = 35;
    Correction_position_y = 20;
    Correction_width = 55;
    Correction_height = 20;
    height = 100;
    width = 100;
    splash = false;
    speed_x;
    IMAGE_ROTATION_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGE_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
     * 
     * the constructor executes all the contained function as soon as this object is created
     * @param {*} x 
     * @param {*} y 
     */

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_ROTATION_BOTTLE);
        this.loadImages(this.IMAGE_SPLASH_BOTTLE);
        this.position_y = y;
        this.position_x = x;
        this.throw()
    }

    /**
     * this function determines whether the bottle is thrown to the left or right and updates the images in the throw
     * 
     */
    throw () {
        this.applyGravity();
        if (world.character.otherDirection) {
            this.ThrowLeft();
        } else {
            this.ThrowRight();
        }
        this.speed_y = 34;
        setInterval(() => {
            this.ImageUpdate()
        }, 1000 / 20);
    }


    /**
     * this function increases position x so that the bottle is thrown to the right
     * 
     */
    ThrowRight() {
        setInterval(() => {
            this.position_x += 20;
        }, 50);
    }

    /**
     * this function reduces position_x so that the bottle is thrown to the left.
     * 
     */
    ThrowLeft() {
        setInterval(() => {
            this.position_x -= 20;
        }, 50);
    }

    /**
     * this function is for the animation of the bottle in the litter
     * 
     */
    ImageUpdate() {
        if (!this.splash) {
            this.playAnimation(this.IMAGE_ROTATION_BOTTLE)
        } else {
            this.playAnimation(this.IMAGE_SPLASH_BOTTLE)
        }
    }
}