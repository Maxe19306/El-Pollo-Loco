class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    constructor() {
        this.moveWithKey();
        this.moveRighttbyButton();
        this.moveLeftbyButton();
        this.moveUpbyButton();
        this.movethrowbyButton();
    }

    /**
     * This function sets the RIGHT variable to true when RIGHT button is pressed. 
     * As soon as it is no longer pressed, the variable is set to incorrect. This moves the character.  
     * 
     */
    moveRighttbyButton() {
        document.getElementById('right').addEventListener('touchstart', () => {
            this.RIGHT = true;
        });
        document.getElementById('right').addEventListener('touchend', () => {
            this.RIGHT = false;
        })
    }


    /**
     * This function sets the LEFT variable to true when LEFT button is pressed. 
     * As soon as it is no longer pressed, the variable is set to false. This moves the character.  
     * 
     */
    moveLeftbyButton() {
        document.getElementById('left').addEventListener('touchstart', () => {
            this.LEFT = true;
        });
        document.getElementById('left').addEventListener('touchend', () => {
            this.LEFT = false;
        })
    }

    /**
     * This function sets the SPACE variable to true when UP button is pressed. 
     * As soon as it is no longer pressed, the variable is set to false. This causes the character to jump. 
     * 
     */
    moveUpbyButton() {
        document.getElementById('up').addEventListener('touchstart', () => {
            this.SPACE = true;
        });
        document.getElementById('up').addEventListener('touchend', () => {
            this.SPACE = false;
        })
    }


    /**
     * This function sets the D variable to true when THROW button is pressed.
     *  As soon as it is no longer pressed, the variable is set to false. As a result, the character throws a bottle.
     * 
     */
    movethrowbyButton() {
        document.getElementById('throw').addEventListener('touchstart', () => {
            this.D = true;
        });
        document.getElementById('throw').addEventListener('touchend', () => {
            this.D = false;
        })
    }


    /**
     * This function sets the variables to true as long as the respective key is pressed. As a result, the character moves or throws bottles.
     * 
     */
    moveWithKey() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = true;
            }
            if (event.keyCode == 37) {
                this.LEFT = true;
            }
            if (event.keyCode == 38) {
                this.UP = true;
            }
            if (event.keyCode == 40) {
                this.DOWN = true;
            }
            if (event.keyCode == 32) {
                this.SPACE = true;
            }
            if (event.keyCode == 68) {
                this.D = true;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = false;
            }
            if (event.keyCode == 37) {
                this.LEFT = false;
            }
            if (event.keyCode == 38) {
                this.UP = false;
            }
            if (event.keyCode == 40) {
                this.DOWN = false;
            }
            if (event.keyCode == 32) {
                this.SPACE = false;
            }
            if (event.keyCode == 68) {
                this.D = false;
            }
        });
    }
}