// Player.js
// - A class representing a player

'use strict';

dime.Player = function () {
  this.x = 80;
  this.y = dime.Player.BASELINE_Y;

  // Because the image contains so much unclipped transparency, these variables
  // tell the position of the real image withing the big images
  this.fixtureLeft = 151;
  this.fixtureTop = 95;
  this.fixtureWidth = 74;
  this.fixtureHeight = 180;

  // Acceleration in y-direction, related to gravity.
  this.yPlus = 0;
  this.midair = false;

  // This function will return all the frames that are loaded, or an empty
  // array if all frames have not been loaded
  this.getFrames = function () { return []; };

  this.currentFrame = 0;
  this.movedSinceLastFrame = 0;

  // How fast does the player move currently
  this.speedInPxPerSec = 200;
};

// A constant for a nice running animation, tells how many pixels the player can
// move forward before the frame is switched
dime.Player.FRAME_LENGTH_IN_PX = 30;

// The floor y-coordinate
dime.Player.BASELINE_Y = 300;

dime.Player.prototype = {

  // Called in dime.Gfx.setup(), loads all the different frames for player
  setup: function () {
    this.getFrames = dime.Utils.loadManyImages(['ukkeli1.png', 'ukkeli2.png',
      'ukkeli3.png', 'ukkeli4.png', 'ukkeli5.png']);
  },

  // Draws the current frame of the player to the given context
  draw: function (context) {
    if (this.isReady()) {
      var frames = this.getFrames();
      context.save();

      context.translate(this.x - this.fixtureLeft, this.y - this.fixtureTop);
      context.drawImage(frames[this.currentFrame], 0, 0);
      context.restore();
    }
  },

  // Returns a boolean which indicates whether the player frames are all loaded
  isReady: function () {
    return (this.getFrames().length > 0)
  },

  // Called on every tick of the game (happens in Gfx.tick), this function
  // updates players gravity and animation.
  tick: function (delta) {
    var modifier, movement;
    if (!this.isReady())
      return;

    movement = dime.Utils.pxPerSec(this.speedInPxPerSec);
    dime.Game.status.distanceRanInPx += movement;
    if (this.midair) {
      modifier = delta / 1000;
      this.yPlus -= dime.Config.gravity * modifier;
      this.y -= this.yPlus * modifier;

      if (this.y > dime.Player.BASELINE_Y) {
        this.y = dime.Player.BASELINE_Y;
        this.yPlus = 0;
        this.midair = false;
      }
    }
    else {
      this.movedSinceLastFrame += movement;
      if (this.movedSinceLastFrame > dime.Player.FRAME_LENGTH_IN_PX) {
        this.movedSinceLastFrame -= dime.Player.FRAME_LENGTH_IN_PX;
        this.currentFrame++;
        if (this.currentFrame >= this.getFrames().length) {
          this.currentFrame = 0;
        }
      }
    }
  },

  // Returns players current speed in pixels per second
  getSpeed: function () {
    return this.speedInPxPerSec;
  },

  // Makes the player jump. force is optional and defaults to 600
  jump: function (force) {
    if (this.canJump()) {
      this.yPlus = force || 600;
      this.midair = true;
    }
  },

  // Returns whether the player can currently jump or not
  canJump: function () {
    return !this.midair;
  },

  // Modifies player speed by the given amount
  modifySpeed: function (amount) {
    this.speedInPxPerSec += amount;
    if (this.speedInPxPerSec < 0) {
      this.speedInPxPerSec = 0;
    }
  },

  getX: function () {
    var inGameX = this.fixtureLeft - this.x + dime.Game.status.distanceRanInPx;
    return inGameX;
  },

  getY: function () {
    return this.y;
  },

  getWidth: function () {
    return this.fixtureWidth;
  },

  getHeight: function () {
    return this.fixtureHeight;
  }
};


dime.ObstacleContainer = {

  baseLineY: 400,
  obstacleSize: 40,
  obstacleOffset: 20,
  getObstacleImage: function () { return null; },
  distanceBetweenTwoObstacles: 1500,

  setup: function () {
    this.getObstacleImage = dime.Utils.loadImage('aita2.png');
  },

  isColliding: function (objX, objY, objWidth, objHeight) {
    var rect1 = { x: objX, y: objY, w: objWidth, h: objHeight };

    var x = this.distanceBetweenTwoObstacles;
    while (x < dime.Game.status.distanceRanInPx - 200) {
      x += this.distanceBetweenTwoObstacles;
    }

    var rect2 = {
      x: x + this.obstacleOffset,
      y: this.baseLineY + this.obstacleOffset,
      w: this.obstacleSize,
      h: this.obstacleSize
    };

    if (this._isRectRectCollision(rect1, rect2)) {
      return true;
    }
    return false;
  },

  _isRectRectCollision: function (rect1, rect2) {
    var left1 = rect1.x;
    var right1 = rect1.x + rect1.w;
    var top1 = rect1.y;
    var bottom1 = rect1.y + rect1.h;

    var left2 = rect2.x;
    var right2 = rect2.x + rect2.w;
    var top2 = rect2.y;
    var bottom2 = rect2.y + rect2.h;

    if (left1 > right2) return false;
    if (right1 < left2) return false;
    if (top1 > bottom2) return false;
    if (bottom1 < top2) return false;

    return true;
  },

  draw: function (context) {
    if (!this.isReady())
      return;

    var player = dime.Gfx._player;
    var playerX, playerY, playerW, playerH;

    playerX = player.getX() - dime.Game.status.distanceRanInPx;
    playerY = player.getY();
    playerW = player.getWidth();
    playerH = player.getHeight();

    var img = this.getObstacleImage();
    var x = this.distanceBetweenTwoObstacles - dime.Game.status.distanceRanInPx;

    while (x < -200) {
      x += this.distanceBetweenTwoObstacles;
    }

    context.drawImage(img, x, this.baseLineY);

    context.strokeRect(playerX, playerY, playerW, playerH);

    var rect2 = {
      x: x + this.obstacleOffset,
      y: this.baseLineY + this.obstacleOffset,
      w: this.obstacleSize,
      h: this.obstacleSize
    };

    context.strokeRect(rect2.x, rect2.y, rect2.w, rect2.h);
  },

  isReady: function () {
    return this.getObstacleImage() != null;
  },

  tick: function (delta) {
    var player = dime.Gfx._player;
    var playerX, playerY, playerW, playerH;

    playerX = player.getX();
    playerY = player.getY();
    playerW = player.getWidth();
    playerH = player.getHeight();

    if (this.isColliding(playerX, playerY, playerW, playerH)) {
      console.log('collision at ' + (new Date()));
    }
  }
}