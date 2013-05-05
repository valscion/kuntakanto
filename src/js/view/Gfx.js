// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,

  init: function (renderingContext) {
    this._ctx = renderingContext;
    this._player = new dime.Player();
  },

  setup: function () {
    this._player.init();
  },

  tick: function (delta) {
    this._player.tick(delta);
    this.clear();
    this.draw();
  },

  draw: function () {
    this._ctx.fillText('Hello world!', 10, 10);
    this._player.draw(this._ctx);
  },

  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};

dime.Player = function () {
  this.x = 0;
  this.y = 200;

  this.frames = [];
  this.countOfReadyFrames = 0;

  this.currentFrame = 0;
  this.movedSinceLastFrame = 0;

  this.speedInPxPerSec = 100;

  this.mirrored = false;
};

dime.Player.FRAME_LENGTH_IN_PX = 15;

dime.Player.prototype = {
  init: function () {
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
      if (this.mirrored) {
        fixMiddle *= -1;
      }
      context.translate(this.x + fixMiddle, this.y);
      if (this.mirrored) {
        context.scale(-1, 1);
      }
      context.drawImage(this.frames[this.currentFrame], 0, 0);
      context.restore();
    }
  },

  isReady: function () {
    return (this.countOfReadyFrames == this.frames.length)
  },

  tick: function (delta) {
    if (!this.isReady())
      return;

    var movement = dime.Utils.pxPerSec(this.speedInPxPerSec);

    this.movedSinceLastFrame += movement;
    if (this.movedSinceLastFrame > dime.Player.FRAME_LENGTH_IN_PX) {
      this.movedSinceLastFrame -= dime.Player.FRAME_LENGTH_IN_PX;
      this.currentFrame++;
      if (this.currentFrame >= this.frames.length) {
        this.currentFrame = 0;
      }
    }
    if (this.mirrored) {
      this.x -= movement;
    }
    else {
      this.x += movement;
    }

    if (this.x > dime.Config.width - 200 || this.x < 0) {
      this.mirrored = !this.mirrored;
    }
  }
};