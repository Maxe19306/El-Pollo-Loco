class StatusBarCoin extends DrawableObject {
    position_y = 50;
    height = 50;
    width = 150;
    position_x = 0;
    IMAGE_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]
    currentImage = 0;
    percentageCoin = 0;


    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGE_COIN);
        this.setPercentageCoin(0);
    }


    /**
     * this function changes the status bar due to the collected objects
     * 
     * @param {*} percentageCoin 
     */

    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;
        let path = this.IMAGE_COIN[this.resolveImageIndexCoin()]
        this.img = this.imageCache[path];

    }

    /**
     * this function returns a number. The number is determined by percentageCoin.
     * 
     * @returns 
     */
    resolveImageIndexCoin() {
        if (this.percentageCoin >= 100) {
            return 5
        } else if (this.percentageCoin > 80) {
            return 4
        } else if (this.percentageCoin > 60) {
            return 3
        } else if (this.percentageCoin > 40) {
            return 2
        } else if (this.percentageCoin > 20) {
            return 1
        } else {
            return 0
        }

    }
}