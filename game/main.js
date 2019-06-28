import { MovingObject } from './models/movingObject.js'
import { Asteroid } from './models/asteroid.js';
import { Bullet } from './models/bullet.js';
import { Ship } from "./models/ship.js";
import { Debris } from "./models/debris.js";
import { Score } from "./models/score.js";

let WIDTH;
let HEIGHT;

let Asteroids = function(){
  let elem = document.getElementById('canvas');
  let ctx = elem.getContext('2d');

  WIDTH = 1250//elem.width();
  HEIGHT = 600//elem.height();

  this.game = new Game(ctx);
  this.game.start(ctx);
}
