// Player.js
// - A class representing a player

'use strict';

dime.Player = function () {
  this.x = 80;
  this.y = 200;

  // Acceleration in y-direction, related to gravity.
  this.yPlus = 0;
  this.midair = false;

  // All the different frames are stored in this array
  this.frames = [];
  this.countOfReadyFrames = 0;

  this.currentFrame = 0;
  this.movedSinceLastFrame = 0;

  // How fast does the player move currently
  this.speedInPxPerSec = 200;
};

// A constant for a nice running animation, tells how many pixels the player can
// move forward before the frame is switched
dime.Player.FRAME_LENGTH_IN_PX = 30;

dime.Player.prototype = {

  // Called in dime.Gfx.setup(), loads all the different frames for player
  setup: function () {
    var self = this, i, tempImg;

    for (i = 5; i >= 1; i--) {
      tempImg = new Image();
      tempImg.onload = function () {
        self.countOfReadyFrames++;
      }
      (function (frameId) {
        tempImg.onerror = function () {
          console.warn('Failed to load frame ' + frameId + ' for player');
        }
      }(i));
      tempImg.src = dime.Config.gfxDir + "ukkeli" + i + ".png";
      this.frames.push(tempImg);
    }
  },

  // Draws the current frame of the player to the given context
  draw: function (context) {
    if (this.isReady()) {
      context.save();

      var fixMiddle = -this.frames[0].width / 2;
      context.translate(this.x + fixMiddle, this.y);
      context.drawImage(this.frames[this.currentFrame], 0, 0);
      context.restore();
    }
  },

  // Returns a boolean which indicates whether the player frames are all loaded
  isReady: function () {
    return (this.countOfReadyFrames == this.frames.length)
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

      if (this.y > 200) {
        this.y = 200;
        this.yPlus = 0;
        this.midair = false;
      }
    }
    else {
      this.movedSinceLastFrame += movement;
      if (this.movedSinceLastFrame > dime.Player.FRAME_LENGTH_IN_PX) {
        this.movedSinceLastFrame -= dime.Player.FRAME_LENGTH_IN_PX;
        this.currentFrame++;
        if (this.currentFrame >= this.frames.length) {
          this.currentFrame = 0;
        }
      }
    }
  },

  // Returns players current speed in pixels per second
  getSpeedInPxPerSec: function () {
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
  }
};