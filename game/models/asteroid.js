import { default as COLORS } from '../../helpers/constants/colors.js'
import MovingObject from './movingObject.js'

class Asteroid extends MovingObject {
  constructor(startX, startY){
    let radius = 40 + Math.random() * 50;
    super(startY, startY, radius);
    this._randomizeSpeed();

  }

  // Randomize radius for asteroid
  _randomizeRadius(){
    return 40 + Math.random() * 50;
  }

  /**
   * Set a random speed for the asteroid, in the form of
   * rate of change in x and y co-ordinates. 
   */
  _randomizeSpeed(){
    this.dx = -2 + (Math.random() * 4);
    this.dy = -2 + (Math.random() * 4);
  }

  /**
   * 
   * @param {CanvasContext} context - the contexz to draw on.
   * @param {*} x - x coordinate. 
   * @param {*} y - y coordinae
   * @param {*} r - radius
   */
  draw(context, x, y, r){
    context.beginPath();

    // Create a circle, since that's what our 'asteroid' is. 
    context.arc(
      x, 
      y, 
      r, 
      0, /* startAngle. TODO: move to named parameter once test working.  */
      Math.PI * 2, /* endAngle. TODO: move to named parameter once test working.  */
      true // anticlockwise. TODO: is this necessary?
    )
    // Stroke with white borders.
    context.strokeStyle = COLORS.WHITE;
    context.lineWidth = 4;
    context.stroke();

    // Fill with black.
    context.fillStyle = COLORS.BLACK;
    context.fill();

    context.closePath();
  }

  /**
   * Spawns at leat 2 asteroids. 
   * TODO: make sure they are smaller. 
   * TODO: make sure the radius > 6 is not permanent. 
   */
  _spawnAsteroids(){
    // Spawn at least two asteroids. 
    let spawns = 2 + Math.floor(Math.random() * 4);
    let newAsteroids = [];

    for (let i = 0; i < spawns; i ++ ){
      // TODO: currently only spawns at the center of parent. 
      let newAsteroid = new Asteroid(this.x, this.y);

      if (newAsteroid.radius > 6){
        newAsteroids.push(newAsteroid);
      }
    }

    return newAsteroids;
  }

  /**
   * Spawn asteroids. 
   */
  explode(){
    this._spawnAsteroids();
  }

}

export default Asteroid;