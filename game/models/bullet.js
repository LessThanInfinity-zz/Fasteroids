import MovingObject from './movingObject.js'
import { default as COLORS } from "../../helpers/constants/colors.js";
import { default as SETTINGS } from "../../helpers/constants/settings.js";

class Bullet extends MovingObject {
  constructor(startX, startY, angle){
    let radius = 3;
    super(startX, startY, radius);

    // Set angle of ship. 
    this.angle = angle;
    this.speed = 15;

    // Set horizontal velocity.
    this.vx = this.speed  * Math.sin(this.angle);
    this.vy = this.speed  * -Math.cos(this.angle);

    // Indicates end of bullet life. 
    this.done = false; 
  }

  isOffScreen(){
    return (
      this.x < 0 || 
      this.x > SETTINGS.CANVAS_WIDTH || 
      this.y < 0 || 
      this.y > SETTINGS.CANVAS_HEIGHT
    );
  }

  /* Circular bullets. */
  draw(context){
    context.beginPath();
    context.arc(this.x, this.y, this.radius,0, Math.PI*2, true);
    context.fillStyle = COLORS.WHITE;
    context.fill();
    context.closePath();
  }
}


export default Bullet;