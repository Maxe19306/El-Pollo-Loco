class Character extends MovableObject {
    height = 400;
    position_x = 0;
    CurrentTime;
    walking_sound = new Audio('audio/walkingAudio.mp3')
    lose_sound = new Audio('audio/lose.mp3')
    position_y = 50;
    width = 160;
    GameExit = false;
    world;
    lastTime;
    allIntervall = [];
    speed_x = 10;
    Correction_position_x = 25;
    Correction_position_y = 190;
    Correction_width = 72;
    Correction_height = 200;
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]
    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    currentImage = 0;

    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     */
    // muss bei jeder Klasse sein, wird immer ausgeführt wenn Character aufgerufen wird.
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); // super muss immer am Anfang des constuctor stehen.
        this.loadImages(this.IMAGES_IDLE); // loadImages lädt alle Bilder aus dem jeweiligen Array, abgespielt werden sie erst durch animate() - playAnimation(); 
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.addCurrentTime();
    }


    /**
     * this function stores current time
     * 
     */
    addCurrentTime() {
        this.setStoppableInterval(() => {
            this.CurrentTime = new Date().getTime();
        }, 1000 / 60);
    }

    /**
     * this function animates the character and determines which image and which direction is correct.
     * 
     */
    animate() {
        this.setStoppableInterval(() => {
            this.walking_sound.pause();
            this.DirectionUpdate();
        }, 1000 / 60);
        // ändert die Bilder des Character
        this.setStoppableInterval(() => {
            this.ImageUpdate()
        }, 200);
    }

    /**
     * this function updates the direction depending on whether the character is running or jumping left or right.
     * 
     */
    DirectionUpdate() {
        if (this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
            this.CharacterMoveRight();
        } else if (this.world.keyboard.LEFT && this.position_x > -100) {
            this.CharacterMoveLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.SafeLastMoveTime();
        }
        this.world.camera_x = -this.position_x + 50;
    }

    /**
     * this function moves the character to the right, lets him look to the right, saves the last part of the movement and plays music on request
     * 
     */
    CharacterMoveRight() {
        this.moveRight();
        this.objectsPeeksRight();
        this.SafeLastMoveTime();
        if (playMusic && this.energy > 0) {
            this.walking_sound.play();
        }
    }

    /**
     * this function moves the character to the left, lets him look to the left, saves the last part of the movement and plays music on request
     * 
     */
    CharacterMoveLeft() {
        this.moveLeft();
        this.objectsPeeksLeft();
        this.SafeLastMoveTime();
        if (playMusic && this.energy > 0) {
            this.walking_sound.play();
        }
    }

    /**
     * 
     * 
     */
    ImageUpdate() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            if (playMusic) {
                this.lose_sound.play();
            }
            setTimeout(() => {
                this.GameExit = true;
            }, 1000);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT)
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMP)
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if ((world.character.CurrentTime - world.character.lastTime) / 1000 < 5) {
            this.playAnimation(this.IMAGES_IDLE)
        } else {
            this.playAnimation(this.IMAGES_IDLE_LONG);
        }
    }


    /**
     * this function stores the time from the last movement
     * 
     */
    SafeLastMoveTime() {
        this.lastTime = new Date().getTime();
    }

    /**
     * this function terminates all saved intervals
     * 
     */

}