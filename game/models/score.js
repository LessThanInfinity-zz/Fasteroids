class Score extends MovingObject{

  /**
   * 
   * @param {*} startX - starting x position of where this score spawns
   * @param {*} startY - starting Y position of where this score spawns
   * @param {*} points - startig points. 
   */
  constructor(startX, startY, points){

    // TODO: change to ES6 syntax. 
    super(startX, startY, 0)

    this.points = points;
    this.dx = 0; // Don't change horizontal position.
    this.dy = -10; // Change vertical position (y). Negative = ascend.

    this.path = 0;
    this.doneDisplaying = false;
  }

  /**
   * Prints this 'score' via drawing on the canvas. 
   * E.g. is points = 1000, 
   * draws '1000' in selected color
   * @param {CanvasContext} context - context to draw on.
   */
  draw(context){
    context.fillStyle = "yellow";
	  context.font = "bold" + 5 + "pt Courier New";
	  context.fillText("+" +this.points, this.x, this.y) 
  }

  /**
   * Moves score upwards on canvas, then fades it out.
   * 
   * @param {*} dx - change in horizontal axis, x.
   * @param {*} dy - change in vertical axix, y.
   */
  update(dx, dy){
    /* Add directional change to score.  */
    this.x += dx;
    this.y += dy;

    // Until score's moved 15 units, keep moving. 
    if (this.path <= 15) {
      this.path += 1;
    } else {
      this.doneDisplaying = true;
    }
  }
}