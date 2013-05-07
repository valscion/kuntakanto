// Player.js

'use strict';

dime.Player = function () {
  this.x = 80;
  this.y = 200;

  this.yPlus = 0;
  this.midair = false;

  this.frames = [];
  this.countOfReadyFrames = 0;

  this.currentFrame = 0;
  this.movedSinceLastFrame = 0;

  this.speedInPxPerSec = 200;
};

dime.Player.FRAME_LENGTH_IN_PX = 30;

dime.Player.prototype = {
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

  draw: function (context) {
    if (this.isReady()) {
      context.save();

      var fixMiddle = -this.frames[0].width / 2;
      context.translate(this.x + fixMiddle, this.y);
      context.drawImage(this.frames[this.currentFrame], 0, 0);
      context.restore();
    }
  },

  isReady: function () {
    return (this.countOfReadyFrames == this.frames.length)
  },

  tick: function (delta) {
    var modifier, movement;
    if (!this.isReady())
      return;

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
      movement = dime.Utils.pxPerSec(this.speedInPxPerSec);
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

  getSpeedInPxPerSec: function () {
    return this.speedInPxPerSec;
  },

  jump: function (force) {
    this.yPlus = force || 600;
    this.midair = true;
  }
};