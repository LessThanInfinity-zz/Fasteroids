import { default as MovingObject } from './movingObject.js'
import { default as Asteroid } from './asteroid.js';
import { default as Bullet } from './bullet.js';
import { default as Ship } from "./ship.js";
import { default as Debris } from "./debris.js";
import { default as Score } from "./score.js";

let WIDTH = 1250//elem.width();
let HEIGHT = 600//elem.height();

class Game {
  constructor(context){
    this._init();
    this.context = context;
  }

  _init(){
    this.bullets    = [];
    this.asteroids  = [];
    this.scores     = [];
    this.totalScore = 0;
    
    /* Initialise record of ship's parts. */
    this.parts = [];

    this._initializeShip();
    this._initializeAsteroids();
  }

  _initializeShip(){
    this.ship = new Ship(WIDTH/2, HEIGHT/2);
  }

  _initializeAsteroids(){
    for (var i = 0; i < 20; i++){
      this.asteroids.push(this._spawnAsteroid());
    }
  }

  draw(){
    this._drawShip(this.context);
    this._drawAsteroids(this.context);
    this._drawBullets(this.context);
    this._drawScores(this.context);

    this._refillAsteroids()
  }

  start(context){
    let loop = setInterval(() => {

    context.clearRect(0,0,WIDTH,HEIGHT);
    context.fillStyle = "#000000"
    context.fillRect(0,0,WIDTH, HEIGHT)

    this.draw(context);
    /* This controls the game's end-state, although the game doesn't exactly... "end". */
    if(this.update()){
      clearInterval(loop);
    }
  }, 30);
  }

  update(){

  }

  _spawnAsteroid(){
    let walls = ['left','right', 'top','bottom'];
    // chooses random wall to spawn asteroid from.
    let sample = walls[Math.floor((Math.random()*4)/1)];
    let startX, startY; 

    switch (sample){
    case "left":
      startX = 0;
      startY = Math.random() * HEIGHT;
      break;
    case "right":
      startX = WIDTH;
      startY = Math.random() * HEIGHT;
      break;
    case "top":
      startX = Math.random() * WIDTH;
      startY = 0;
      break;
    case "bottom":
      startX = Math.random() * WIDTH;
      startY = HEIGHT;
      break;
      }
  
    return new Asteroid(startX, startY);
  }

  _drawShip(context){
    if (this.ship.isDestroyed){
      for(let l = 0; l < this.parts.length; l++){
        let part = this.parts[l];
        this.parts[l].draw(context);
      }
    } else {
      this.ship.draw(context, this.ship.x, this.ship.y)
    }
  }

  _drawAsteroids(context){
    for(let i = 0; i < this.asteroids.length; i++){
      let asteroid = this.asteroids[i];
      this.asteroids[i].draw(context, asteroid.x, asteroid.y, asteroid.r);
    }
  }

  _drawBullets(context){
    for(let j = 0; j < this.bullets.length; j++){
      let bullet = this.bullets[j];
      this.bullets[j].draw(context, bullet.x, bullet.y, bullet.radius);
    }
  }

  _drawScores(context){
    for(let k = 0; k < this.scores.length; k++){
      let score = this.scores[k];
      this.scores[k].draw(context);
    }
  }

  _refillAsteroids(){
    if (this.asteroids.length < 20) {
      let randNum = Math.floor(8 + Math.random()*12);
      for (let i = 0; i < randNum; i++){
        this.asteroids.push(this._spawnAsteroid());      
      }
    }
  }

  _displayTotalScore(context){
    // Display Score.
    context.fillStyle = "white";
    context.font = 25 +"pt Courier New";
    context.fillText("SCORE: " + this.totalScore,20,40 );
  }
}

export default Game;