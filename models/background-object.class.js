class BackgroundObject extends MovableObject {
    width = 720;
    height = 480
    position_y = 480 - this.height;

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     * @param {*} ImagePath 
     * @param {*} x 
     */
    constructor(ImagePath, x) {
        super().loadImage(ImagePath);
        this.position_x = x;
    }


}