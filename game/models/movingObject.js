class MovingObject {

  /**
   * 
   * @param {*} startX - starting X position 
   * @param {*} startY - starting Y position 
   */
  constructor(startX, startY, radius){
    // x, y represent the co-ordinates of the center of the object. 
    this.x = startX;
    this.y = startY;

    this.radius = radius;
  }

  /**
   * Adds change to the x and y coordinates of the object
   * 
   * @param {*} dx - change in x position
   * @param {*} dy - change in y position
   */
  update(dx, dy){
    this.x += dx;
    this.u += dy;
  }

  /**
   * Resets moving object's postion if it goes offscreen. 
   * Note: (0,0) is at the upper left corner of the screen, with no negative 
      positions 
   */
  resetOffScreen(){
     // If object beyond the Left bounds, reset to right
    if (this.x < 0){
      this.x = WIDTH;
    }

    // If object beyond the Right bounds, reset to Left
    else if (this.x > WIDTH){
      this.x = 0;
    }

    // If object beyond Top, reset to bottom
    else if (this.y < 0){
      this.y = HEIGHT;
    }

    // If object beyond Bottom, reset to top
    else if (this.y > HEIGHT){
      this.y = 0;
    }
  }

  /**
   * Checks whether this object has 'collided' with another MovingObject
   * by checking the distance between the two objects' co-ordinates.
   * i.e. the x and y of the center of their hit-circles.
   * 
   * TODO: potentially replace with a more complex collision login in the future. 
   * 
   * as per https://www.whitman.edu/mathematics/calculus_online/section01.02.html
   * 
   * @param {MovingObject} object - Another moving Object
   */
  hasCollidedWith(object){
    let deltaX = this.x - object.x;
    let deltaY = this.y - object.y;
    let distance = (Math.sqrt(Math.pow(deltaX, 2) + (Math.pow(deltaY, 2))));

    // If the distance between the two centers is less than the sum of their radii
    // then the two hit-circles overlap, thus 'colliding'. 
    if (distance < (this.radius + object.radius)){
      return true;
    }
  }