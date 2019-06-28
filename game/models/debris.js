import MovingObject from "./movingObject";

class Debris extends MovingObject {
  constructor(startX, startY, endX, endY){
    super(startX, startY, radius=0);
    this.endX = endX;
    this.endY = endY;

    this._randomizeDirection();
  }

  _randomizeDirection(){
    this.dx = -2 + (Math.random() * 4);
    this.dy = -2 + (Math.random() * 4);
  }

  draw(context){
    context.beginPath();

    // TODO: shift to colors.js.
    context.strokeStyle = "pink";

    context.moveTo(this.x, this.y);
    context.lineTo(this.endX,this.endY);
    context.stroke();
    context.closePath();
  }

  update(dx, dy){
    this.x += dx;
    this.y += dy;
    this.endX += dx;
    this.endY += dy;
  }
}