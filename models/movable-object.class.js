class MovableObject extends DrawableObject {
    energy = 100;
    speed_x;
    otherDirection = false;
    speed_y = 0;
    acceleration = 2;
    lastHit = 0;


    moveLeft() {
        this.position_x -= this.speed_x;
    }
    moveRight() {
        this.position_x += this.speed_x;
    }



    // ist für den Fall des Character nach der Jump funktion zuständig
    applyGravity() {
            setInterval(() => {
                if (this.isAboveGround() || this.speed_y > 0)
                    this.position_y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }, 1000 / 25)
        }
        // sprung/ speed_Y wird erhöht// durch applyGravity wird positin y um speed_y erhöht
    jump() {
        this.speed_y = 28;
    }

    //prüft nur ob der Character in der Luft ist
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Flasche fällt immer
            return true
        } else {
            return this.position_y < 50
        }
    }

    objectsPeeksLeft() {

        this.otherDirection = true;
    }

    objectsPeeksRight() {
        this.otherDirection = false;
    }

    // arr = z.B. character IMAGES_WALK // das Array wird aus der character datei übergeben


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i]
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(movableObject) {
        return this.isCollidingVertical(movableObject) &&
            this.isCollidingHorizont(movableObject)
    }

    isCollidingVertical(movableObject) {
        return this.rightHitBox() > movableObject.leftHitbox() &&
            this.leftHitbox() < movableObject.leftHitbox()
    }

    isCollidingHorizont(movableObject) {
        return this.topHitbox() > movableObject.position_y - movableObject.Correction_width &&
            this.bottomHitbox() < movableObject.topHitbox()
    }

    leftHitbox() {
        return this.position_x + this.Correction_position_x
    }

    rightHitBox() {
        return (this.position_x + this.Correction_position_x) + (this.width - this.Correction_width)
    }

    topHitbox() {
        return (this.position_y + this.Correction_position_y) + (this.height - this.Correction_height)
    }

    bottomHitbox() {
        return this.position_y + this.Correction_position_y
    }



    isCollidingotherDirection(movableObject) {
        return movableObject.rightHitBox() > this.leftHitbox() &&
            movableObject.topHitbox() > this.position_y - this.Correction_width &&
            movableObject.leftHitbox() < this.leftHitbox() &&
            movableObject.bottomHitbox() < this.topHitbox()
    }

    // verringt die Energie sobald eine Collision mit den Gegner ist.
    hit() {
            this.energy -= 5;
            if (this.energy <= 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
        // speichert den Zeitpunkt der letztens Collison mit den Gegner ab, gibt "true" zurück sollte der Zeitraum kürzer als 1.5 Sekunden sein// 
        //wichtig für die animate Funktion vom Character - wird wahr zurück gegeben wird die Verletzt Animation abgespielt
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }

    stopIntervall() {
        this.allIntervall.forEach(clearInterval);
    }


    setStoppableInterval(fn, time) {
            let id = setInterval(fn, time);
            this.allIntervall.push(id);
        }
        /**
         * this function updates the direction depending on whether the enemy is running left or right.
         * 
         */
    DirectionUpdateEnemy() {
        if (world.character.position_x < this.position_x) {
            this.moveLeft();
            this.objectsPeeksRight();
        } else {
            this.objectsPeeksLeft()
            this.moveRight();
        }
    }
}