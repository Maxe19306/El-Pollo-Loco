class Level {
    level_end_x = 2800;
    enemies;
    clouds;
    backgroundObjects;
    salsabottles;
    coins;


    /**
     * the constructor executes all the contained function as soon as this object is created
     * 
     * @param {*} enemies 
     * @param {*} clouds 
     * @param {*} backgroundObjects 
     * @param {*} salsabottles 
     * @param {*} coins 
     */
    constructor(enemies, clouds, backgroundObjects, salsabottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.salsabottles = salsabottles;
        this.coins = coins;
    }
}