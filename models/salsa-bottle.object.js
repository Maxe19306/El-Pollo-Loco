class Salsabottle extends MovableObject {
    position_y = 360;
    height = 100;
    width = 100;
    currentImage = 0;
    sound = new Audio('audio/bottle.mp3');
    Correction_position_x = 35;
    Correction_position_y = 20;
    Correction_width = 55;
    Correction_height = 20;
    allIntervall = []
    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGE_BOTTLE);
        this.position_x = 100 + Math.random() * 2500;
        this.animate();
    }



    /**
     * this function is responsible for the animation of the bottle on the bottom
     * 
     */
    animate() {
        this.setStoppableInterval(() => {
            this.playAnimation(this.IMAGE_BOTTLE);
        }, 500)
    }



}