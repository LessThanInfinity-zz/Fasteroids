import MovingObject from "./movingObject.js";
import { default as COLORS } from "../../helpers/constants/colors.js";



class Ship extends MovingObject {
  constructor(startX, startY){
    let radius = 25;
    super(startX, startY, radius);

    this._setInitialVelocity();
    this._setInitialPosition();

    // Game Check booleans.
    this.pedal = false; // maybe rename to thrusters.
    this.isDestroyed = false;
  };

  _setInitialPosition(){
    this.nose       = [0,-(this.radius)];
    this.leftWing   = [0-(this.radius/2), this.radius*Math.sqrt(3)/2];
    this.rightWing  = [(this.radius/2), this.radius*Math.sqrt(3)/2];
    this.tail       = [0,this.radius+this.radius/3];
  }

  _setInitialVelocity(){
    this.vx = 0; // no movement horizontally. 
    this.vy = -.5; // initial forward movement. 
    this.angle = 0.00; // look dead ahead.
  }

  _updateShipCoordinates(){
    this._updateNose();
    this._updateLeftWing();
    this._updateRightWing();
    this._updateLeftLeg();
    this._updateRightLeg();
  }

  _updateNose(){
    let nose = [0, -this.radius];
    let noseX = nose[0]*Math.cos(this.angle) - nose[1]*Math.sin(this.angle);
    let noseY = nose[0]*Math.sin(this.angle) + nose[1]*Math.cos(this.angle);
    this.nose = [noseX, noseY];

  }

  _updateLeftWing(){
    let leftWing = [0-(this.radius/2), this.radius*Math.sqrt(3)/2];
    let leftWingX = leftWing[0]*Math.cos(this.angle) - leftWing[1]*Math.sin(this.angle);
    let leftWingY = leftWing[0]*Math.sin(this.angle) + leftWing[1]*Math.cos(this.angle);
    this.leftWing = [leftWingX, leftWingY];

  }
  _updateRightWing(){
    let rightWing = [(this.radius/2), this.radius*Math.sqrt(3)/2];
    let rightWingX = rightWing[0]*Math.cos(this.angle) - rightWing[1]*Math.sin(this.angle);
    let rightWingY = rightWing[0]*Math.sin(this.angle) + rightWing[1]*Math.cos(this.angle);
    this.rightWing = [rightWingX, rightWingY];

  }
  _updateLeftLeg(){
    let leftLeg = [0-((this.radius+15)/2), (this.radius+15)*Math.sqrt(3)/2];
    let leftLegX = leftLeg[0]*Math.cos(this.angle) - leftLeg[1]*Math.sin(this.angle);
    let leftLegY = leftLeg[0]*Math.sin(this.angle) + leftLeg[1]*Math.cos(this.angle);
    this.leftLeg = [leftLegX, leftLegY]

  }
  _updateRightLeg(){
    let rightLeg = [((this.radius+15)/2), (this.radius+15)*Math.sqrt(3)/2];
    let rightLegX = rightLeg[0]*Math.cos(this.angle) - rightLeg[1]*Math.sin(this.angle);
    let rightLegY = rightLeg[0]*Math.sin(this.angle) + rightLeg[1]*Math.cos(this.angle);
    this.rightLeg = [rightLegX, rightLegY]

  }
  _updateIgnitionTail(){
    // Update ignition Tail. 
    let tail = [0,this.radius+this.radius/2];
    let tailX = tail[0]*Math.cos(this.angle) - tail[1]*Math.sin(this.angle);
    let tailY = tail[0]*Math.sin(this.angle) + tail[1]*Math.cos(this.angle);
    this.tail = [tailX,tailY];

  }
  _drawHitCircle(context, x, y){
    // TODO: what is this doing, first?
    // TODO: draw hitCircle. 
    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI*2, true); // TODO: apparently this doesnt support es6?
    context.fillStyle = COLORS.BLACK;
    context.fill();
    context.closePath();
  }

  _drawShip(context, x, y){

  /* Draw the Ship. 
  Outline Ship: Move to Nose, then nose-leftWing-rightWing-Nose. */
    context.beginPath();
    context.strokeStyle = COLORS.WHITE;
    context.lineWidth = 1.5;

    // Move to nose
    context.moveTo(x + this.nose[0], y + this.nose[1]);

    // Draw to left wing point, then to leg, move back to wing.
    context.lineTo(x + this.leftWing[0], y + this.leftWing[1]);
    context.lineTo(x + this.leftLeg[0],  y + this.leftLeg[1]);
    context.moveTo(x + this.leftWing[0], y + this.leftWing[1]);

    // Similarly, draw to right wing point, then to leg, then back to wing. 
    context.lineTo(x + this.rightWing[0], y + this.rightWing[1]);
    context.lineTo(x + this.rightLeg[0],  y + this.rightLeg[1]);
    context.moveTo(x + this.rightWing[0], y + this.rightWing[1]);  

    // Join back to nose. 
    context.lineTo(x + this.nose[0], y + this.nose[1])
    context.stroke();
    context.closePath();
  }

  _drawIgnitionTail(context, x, y){
    if (this.pedal){
      context.beginPath();
      let blackOrWhite = Math.floor(Math.random()*12)
      if (blackOrWhite <= 3)
      {
        blackOrWhite = COLORS.BLACK;
      } else {
        blackOrWhite = COLORS.WHITE;
      }
        // var strokes = ["#ffffff", "F8F539", "F89239","F83939", "#000000"];
      context.strokeStyle = blackOrWhite; // strokes[Math.floor(Math.random() * strokes.length)];
      context.moveTo(x+ this.leftWing[0], y+ this.leftWing[1]);
      context.lineTo(x + tailX, y+ tailY);
      context.lineTo(x + this.rightWing[0], y+ this.rightWing[1]);
        context.stroke();
      context.closePath();
    }
  }

  

  draw(context, x, y){
    
    this._drawHitCircle(context, x, y);
    this._updateShipCoordinates();
    this._drawShip(context, x, y);
    this._drawIgnitionTail(context, x, y);

  }

  accelerate(){
    this.vx += 0.2*Math.sin(this.angle);
    // Prevent ship from reaching light speed. 
    if (this.vx > 10){
      this.vx = 10;
    } else if (this.vx < -10){
      this.vx = -10;
    }

    // Prevent ship from reaching light speed. 
    this.vy += -0.2*Math.cos(this.angle);
    if (this.vy > 10){
      this.vy = 10;
    } else if (this.vy < -10){
      this.vy = -10;
    }
  }

  decelerate(){
    this.vx -= 0.2*Math.sin(this.angle);

    // Prevent ship from reaching light speed. 
    if (this.vx > 10){
      this.vx = 10;
    } 

    this.vy -= -0.2*Math.cos(this.angle);
    if (this.vy > 10){
      this.vy = 10;
    } 
  }

  /**
   * 
   * @param {Number} dAngle - change in angle. 
   */
  steer(dAngle){
    this.angle += dAngle
  }

  fireBullet(){
    let bullet = new Bullet(this.x + this.nose[0], this.y + this.nose[1], this.angle);
    return bullet;
  }
  


}


export default Ship;