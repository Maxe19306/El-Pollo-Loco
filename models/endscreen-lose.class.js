class EndscreenLose extends MovableObject {
    height = 480;
    width = 720;
    position_y = 0;
    position_x;

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     * @param {*} position_x 
     */
    constructor(position_x) {
        super().loadImage('img/9_intro_outro_screens/game_over/oh no you lost!.png');
        this.position_x = position_x - 50;
    }

}