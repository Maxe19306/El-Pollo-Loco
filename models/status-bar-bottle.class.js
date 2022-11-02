class StatusBarBottle extends DrawableObject {
    position_y = 100;
    height = 50;
    width = 150;
    position_x = 0;
    IMAGE_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]
    currentImage = 0;
    percentageBottle = 0;

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
        this.loadImages(this.IMAGE_BOTTLE);

        this.setPercentageBottle(0);
    }


    /**
     * this function changes the status bar due to the collected objects
     * 
     * @param {*} percentageBottle 
     */
    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle;
        let path = this.IMAGE_BOTTLE[this.resolveImageIndexBottle()]
        this.img = this.imageCache[path];

    }

    /**
     * this function returns a number. The number is determined by percentageBottle.
     * 
     * @returns 
     */
    resolveImageIndexBottle() {
        if (this.percentageBottle >= 100) {
            return 5
        } else if (this.percentageBottle > 80) {
            return 4
        } else if (this.percentageBottle > 60) {
            return 3
        } else if (this.percentageBottle > 40) {
            return 2
        } else if (this.percentageBottle > 20) {
            return 1
        } else {
            return 0
        }

    }
}