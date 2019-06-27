import MovingObject from './movingObject.js'

class Bullet extends MovingObject {
  constructor(startX, startY, angle){
    let radius = 3;
    super(startX, startY, radius);

    // Set angle of ship. 
    this.angle = angle;
    // Set horizontal velocity.
    this.vx = this.speed + Math.sin(this.angle);
    this.vy = this.speed + -Math.sin(this.angle);

    // Indicates end of bullet life. 
    this.done = false; 
  }

  isOffScreen(){
    return (
      this.x < 0 || 
      this.x > WIDTH || 
      this.y < 0 || 
      this.y > HEIGHT
    );
  }

  /* Circular bullets. */
  draw(context){
    context.beginPath();
    context.arc(this.x, this.y, this.r,0, Math.PI*2, true);
    context.fillStyle = COLORS.WHITE;
    context.fill();
    context.closePath();
  }
}


export default Bullet;