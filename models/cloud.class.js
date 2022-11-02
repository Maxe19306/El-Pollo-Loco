class Cloud extends MovableObject {
    position_y = 0;
    height = 350;
    width = 500;
    speed_x = 0.15;
    IMAGES_CLOUD = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png',
    ]

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.position_x = -40 + Math.random() * 2000;
        this.animate()
    }

    /**
     * this function allows the cloud to move to the left
     * 
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}