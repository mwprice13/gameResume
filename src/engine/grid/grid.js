class Grid {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    for (let x = 0; x < width; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < height; y++) {
        this.tiles[x][y] = new Tile(x, y);
      }
    }
  }

  getTile(x, y) {
    if (x < 0 || this.width <= x || y < 0 || this.height <= y) {
      throw Error(`Invalid tile coordinate (${x}, ${y}).`);
    }
    return this.tiles[x][y];
  }

  isEmpty() {
    for (let row of this.tiles) {
      for (let tile of row) {
        if (!tile.isEmpty()) {
          return false;
        }
      }
    }
    return true;
  }

  clear() {
    this.tiles.forEach(row => row.forEach(tile => tile.clear()));
  }

  delete(index) {
    delete this.tiles[index];
  }

  draw(context) {
	this.tiles.forEach(row => row.forEach(tile => {
	  tile.draw(context);
    }));
  }

  update() {
    this.tiles.forEach(row => row.forEach(tile => {
      tile.update();
    }));
  }

}