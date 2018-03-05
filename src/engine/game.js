/**
 * Game Engine
 */
class Game {
    constructor() {
        /**
         * Game Loops per second
         * @type {number}
         */
        this.TICK_PER_SECOND = 30;

        /**
         * HTML canvas on webpage
         * @type {Element}
         */
        this.canvas = document.getElementById('canvas');

        /**
         * X and Y coordinates of mouse on canvas
         * @type {{x:number, y:number}}
         */
        this.mouse = {};

        /**
         * All Layers to be drawn on canvas starting with index 0.
         * Highest indexed layer is drawn last; resulting in layer
         * being drawn on top of all others
         * @type {Layer[]}
         */
        this.layers = [];

        /**
         * The sprite layer for in-game objects.
         * @type {Layer}
         */
        this.spriteLayer = new Layer();
        this.layers[0] = this.spriteLayer;

        /**
         * The overlay layer for HUD objects.
         * @type {Layer}
         */
        this.overlayLayer = new Layer();
        this.layers[1] = this.overlayLayer;

        this.content = [];

        addEventListener('mousemove', event => this.onMouseMove(event));
    }

    start() {
        this.loop = setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.TICK_PER_SECOND);
    }

    update() {

    }

    draw() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect = (0, 0, canvas.width, this.canvas.height);

        ctx.strokeStyle = '#fff';
        ctx.strokeReact(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < layers.length; i++) {
            this.layers[i].draw(ctx);
        }
    }

    addContent(name, path) {
        for (let content of this.content) {
            if (content.name === name) {
                throw Error(`Name \'${name}\' is taken by \'${content.path}\'.`);
            }
        }
        this.content.push({
            name: name,
            path: path
        });
    }

    stop() {
        console.log('Stopping...');
        clearInterval(this.loop);
    }

    /**
     * Loads all content.
     * @returns {*} A promise.
     */
    loadContent() {
        $.ajaxSetup({
            beforeSend: (xhr) => {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType('application/json');
                }
            }
        });

        return new Promise((resolve, reject) => {
            let loaded = {};
            let running = 0;
            for (let content of this.content) {
                running++;
                $.getJSON(content.path).then(data => {
                    running--;
                    loaded[content.name] = data;
                    if (running === 0) {
                        resolve(loaded);
                    }
                }).catch((jqxhr, textStatus, error) => {
                    console.log('jqxhr: ' + JSON.stringify(jqxhr));
                    console.log('ts: ' + JSON.stringify(textStatus));
                    console.log('err: ' + JSON.stringify(error));
                });
            }
        });
    }

    /**
     * On the mouse being moved, the mouse position is updated. Converts the coordinates in the
     * mouse event to the coordinates on the canvas.
     * @param event {Event} The mouse event.
     */
    onMouseMove(event) {
        this.mouse.x = event.x - this.canvas.getBoundingClientRect().left;
        this.mouse.y = event.y - this.canvas.getBoundingClientRect().top;
    }

}