import { default as MovingObject } from './models/movingObject.js'
import { default as Asteroid } from './models/asteroid.js';
import { default as Bullet } from './models/bullet.js';
import { default as Ship } from "./models/ship.js";
import { default as Debris } from "./models/debris.js";
import { default as Score } from "./models/score.js";
import { default as Game } from './models/game.js'

let CANVAS_WIDTH;
let CANVAS_HEIGHT;

let Asteroids = function(){
  let elem = document.getElementById('canvas');
  let ctx = elem.getContext('2d');

  CANVAS_WIDTH = 1250//elem.CANVAS_WIDTH();
  CANVAS_HEIGHT = 600//elem.height();

  this.game = new Game(ctx);
  this.game.start(ctx);
}

export default Asteroids