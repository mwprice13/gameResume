/**
 * Layer to be drawn onto the canvas for a game.
 */
class Layer {
    constructor() {
        /**
         * The objects that can be drawn.
         * @type {Array}
         */
        this.drawables = [];
        this.drawLayer = true;
    }

    /**
     * Adds drawable object to the layer
     * @param drawable
     */
    addDrawable(drawable) {
        this.drawables.push(drawable);
    }

    /**
     * Removes drawable object at given index
     * @param {number} index index of drawable to be removed
     * @returns {^} the removed drawable object
     */
    removeDrawable(index) {
        return this.drawables.splice(index, 1)[0];
    }

    /**
     * Clears out all drawable objects on a layer
     */
    clear() {
        this.drawables = [];
    }

    /**
     * Draws the drawable objects of the layer to the canvas
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if (this.drawLayer) {
            for (let drawable of this.drawables) {
                drawable.draw(context);
            }
        }
    }
}