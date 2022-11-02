class DrawableObject {
    img;
    position_x;
    position_y;
    currentImage = 0;
    imageCache = [];
    width;
    height;

    /**
     * this function loads a single image of the object
     * 
     * @param {*} path 
     */
    loadImage(path) {
        this.img = new Image() // new Image setzt das <img> </img>
        this.img.src = path;
    }

    /**
     * This function draws the individual images / // zeichnet die einzelnen Objecte // this. wird aus der world Datei bei addToMap .> movableObject.Draw( ) übergeben
     * 
     * @param {*} ctx 
     */
    draw(ctx) {

        ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);
    }

    /**
     * This function loads all images of the objects with arrays
     * 
     * @param {*} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}