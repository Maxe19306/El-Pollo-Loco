class World {
    character = new Character();
    endscreenlose = [];
    level = Level1;
    camera_x;
    canvas;
    endboss = new Endboss();
    statusbarlive = new StatusBarLive();
    statusbarbottle = new StatusBarBottle();
    statusbarcoin = new StatusBarCoin();
    throwableObjects = [];
    interval;

    ctx;
    keyboard;
    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     * @param {*} canvas 
     * @param {*} keyboard 
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
            this.interval = setInterval(() => {
                this.checkCollisonsEnemy();
                this.checkCollisonsCoin();
                this.checkCollisonsBottle();
                this.checkThrowableObjects();
                this.checkCollisonsEndboss()
                this.checkThrow();
                this.gameoverWin();
                this.gameoverlose();
            }, 100);
        }
        //übergibt die Welt an Character damit wir von Character auf alles zugreifen können
    setWorld() {
            this.character.world = this;
        }
        // zeichnet unserer Level in die canvas datei
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width) // löschte die "Welt" einmal bevor sie neu gezeichnet wird, sonst wäre alle Figuren unendlich oft da
            // bewegen die Kamera 
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        // setzen die Kamera zurück für die Statusbars damit die immer zu sehen sind.
        this.fixCameraForStatusbars();
        this.addObjectsToMap(this.level.salsabottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.endscreenlose);
        this.ctx.translate(-this.camera_x, 0)
        this.requestDraw();
    }

    //kamera wird zurück gesetzt damit statusbars immer zu sehen sind.
    fixCameraForStatusbars() {
            this.ctx.translate(-this.camera_x, 0)
            this.addToMap(this.statusbarlive);
            this.addToMap(this.statusbarcoin);
            this.addToMap(this.statusbarbottle);
            // ab hier bewegen wir die Kamera wieder

            this.ctx.translate(this.camera_x, 0)
        }
        //wiederholt draw funktion so oft es geht
    requestDraw() {
        let self = this
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    // fast die Vorschleife für alle Objecte mit mehreren Bilder zusammen// bessere Lesbarkeit// objects = z.B. enemies/ wird aus der draw Funktion übergeben
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    // fügt das Bild aus draw() der Karte hinzu// ist für eine bessere Leslichkeit des Codes// MovableObjects = z.B. enemy
    addToMap(MovableObjects) {
        if (MovableObjects.otherDirection) {
            this.flipImage(MovableObjects)
        }
        MovableObjects.draw(this.ctx); // befindet sich in der movable-Object Datei
        if (MovableObjects.otherDirection) {
            this.flipImageBack(MovableObjects);
        }
    }


    // dreht die Bilder um, damit sie in die richtige Richtung schauen beim laufen
    flipImage(MovableObjects) {
            this.ctx.save();
            this.ctx.translate(MovableObjects.width, 0)
            this.ctx.scale(-1, 1)
            MovableObjects.position_x = MovableObjects.position_x * -1;
        }
        // dreht die Bilder wieder zurück
    flipImageBack(MovableObjects) {
        MovableObjects.position_x = MovableObjects.position_x * -1;
        this.ctx.restore();
    }


    checkCollisonsEndboss() {

        if (!this.endboss.isDead() && this.character.isColliding(this.endboss) || !this.endboss.isDead() && this.character.isCollidingotherDirection(this.endboss)) {
            this.character.hit();
            this.statusbarlive.setPercentage(this.character.energy);
        }
    }



    checkCollisonsEnemy() {
            this.level.enemies.forEach((enemy) => {
                if (!enemy.isDead() && this.character.isColliding(enemy) || !enemy.isDead() && this.character.isCollidingotherDirection(enemy)) {
                    if (this.character.isAboveGround() && this.character.speed_y < 0) {
                        enemy.hit();
                        setTimeout(() => {
                            this.CollisionsItem(this.level.enemies, enemy)
                        }, 2500);

                    } else {
                        this.character.hit();
                        this.statusbarlive.setPercentage(this.character.energy);
                    }
                }
            });
        }
        // überprüft ob es eine Collision mit einen Coin gab 
    checkCollisonsCoin() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin) || this.character.isCollidingotherDirection(coin)) {
                this.CollisionsItem(this.level.coins, coin);
                this.statusbarcoin.percentageCoin += 20;
                this.statusbarcoin.setPercentageCoin(this.statusbarcoin.percentageCoin);
                if (playMusic) {
                    coin.sound.play();
                }
            }
        })
    }


    // überprüft ob es eine Collision mit einen Coin gab 
    checkCollisonsBottle() {
            this.level.salsabottles.forEach(bottle => {
                if (this.character.isColliding(bottle) || this.character.isCollidingotherDirection(bottle)) {
                    this.CollisionsItem(this.level.salsabottles, bottle);
                    this.statusbarbottle.percentageBottle += 20;
                    this.statusbarbottle.setPercentageBottle(this.statusbarbottle.percentageBottle);
                    if (playMusic) {
                        bottle.sound.play();
                    }
                }
            });
        }
        /**
         * This function checks whether the throw hits an enemy.
         */
    checkThrow() {
        this.checkThrowEnemy();
        this.checkThrowEndboss();
    }

    checkThrowEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach(element => {
                if (element.isColliding(enemy) || element.isCollidingotherDirection(enemy)) {
                    enemy.hit();
                    if (playMusic) {
                        enemy.dead_Sound.play();
                    } else if (enemy.energy > 0) {
                        return element.splash = true;
                    }
                }
            });
        });
    }

    checkThrowEndboss() {
        this.throwableObjects.forEach(element => {
            if (element.isColliding(this.endboss) || element.isCollidingotherDirection(this.endboss)) {
                this.endboss.hit();
                if (this.endboss.energy > 0) {
                    return element.splash = true;
                }
            }
        })
    }

    /**
     * 
     * @param {*} Array 
     * @param {*} Item 
     */
    // löscht eingesammelte Items aus dem Array, werden dadurch nicht erneut gezeichnet und verschwinden damit von der Map 
    CollisionsItem(Array, Item) {
        let i = Array.indexOf(Item);
        Array.splice(i, 1);
    }

    gameoverWin() {
        if (this.endboss.GameExit) {
            let endscreen = new EndscreenWin(this.character.position_x)
            this.endscreenlose.push(endscreen)
            clearInterval(this.interval);
            document.getElementById('restart').classList.remove('d-none');
            this.character.stopIntervall();
            this.endboss.stopIntervall();
            this.level.enemies.forEach(enemy => {
                enemy.stopIntervall();
            });
            this.stopCoin();
            this.stopSalsabottle();
        }
    }

    stopCoin() {
        this.level.coins.forEach(coin => {
            coin.stopIntervall();
        })
    }
    stopSalsabottle() {

        this.level.salsabottles.forEach(salsabottle => {
            salsabottle.stopIntervall();
        })
    }


    gameoverlose() {
        if (this.character.GameExit) {
            let endscreen = new EndscreenLose(this.character.position_x);
            this.endscreenlose.push(endscreen)
            clearInterval(this.interval);

            document.getElementById('restart').classList.remove('d-none');
            this.level.enemies.forEach(enemy => {
                enemy.stopIntervall();
            });
            this.stopCoin();
            this.stopSalsabottle();
            this.character.stopIntervall();
        }
    }


    checkThrowableObjects() {

        if (this.keyboard.D && this.statusbarbottle.percentageBottle > 0) {
            let bottle = new ThrowableObject(this.character.position_x + 50, this.character.position_y + 280)
            this.throwableObjects.push(bottle)
            this.statusbarbottle.percentageBottle -= 20;
            this.statusbarbottle.setPercentageBottle(this.statusbarbottle.percentageBottle);
            this.character.SafeLastMoveTime();
        }
    }



}