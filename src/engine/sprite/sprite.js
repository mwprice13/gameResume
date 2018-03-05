class Sprite {
    constructor() {
        /**
         * The bounds of the sprite.
         * @type {BoundsComponent}
         */
        this.bounds = null;
        /**
         * The image of the sprite.
         * @type {ImageComponent}
         */
        this.image = null;
    }

    update() {
        if (this.image) {
            this.image.update();
        }
    }

    draw(context) {
        if (this.image) {
            this.image.draw(context);
        }
    }
}