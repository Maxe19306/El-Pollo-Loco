class StatusBarLive extends DrawableObject {
    position_y = 0;
    height = 50;
    width = 150;
    position_x = 0;
    IMAGE_LIVE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ]
    currentImage = 0;
    percentage = 100;


    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png');
        this.loadImages(this.IMAGE_LIVE);
        this.setPercentage(100);
    }


    /**
     * this feature changes the status bar due to the damage suffered by the character
     * 
     * @param {*} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGE_LIVE[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    /**
     * this function returns a number. The number is determined by percentage.
     * 
     * @returns 
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5
        } else if (this.percentage > 80) {
            return 4
        } else if (this.percentage > 60) {
            return 3
        } else if (this.percentage > 40) {
            return 2
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0
        }

    }
}