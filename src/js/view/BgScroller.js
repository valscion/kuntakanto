// BgScroller.js

'use strict';

dime.BgScroller = function (imgOrdinal, player, speedFactor) {
  this.x = 0;
  this.player = player;
  this.speedFactor = speedFactor;
  this.imgOrdinal = imgOrdinal;
  this.img = null;
};

dime.BgScroller.prototype = {
  setup: function () {
    var self = this, i, tempImg;

    tempImg = new Image();
    tempImg.onload = function () {
      self.img = tempImg;
    }
    tempImg.onerror = function () {
      console.warn('Failed to load BgScroller ' + self.imgOrdinal);
    }
    tempImg.src = dime.Config.gfxDir + 'bg' + self.imgOrdinal + ".png";
  },

  draw: function (context) {
    if (this.isReady()) {
      context.save();

      context.translate(this.x, 0);
      context.drawImage(this.img, 0, 0);

      if (this.x + this.img.width <= dime.Config.width) {
        context.translate(this.img.width, 0);
        context.drawImage(this.img, 0, 0);
      }
      context.restore();
    }
  },

  isReady: function () {
    return !!this.img;
  },

  tick: function (delta) {
    if (this.isReady()) {
      var movement = dime.Utils.pxPerSec(this.player.getSpeedInPxPerSec());
      movement *= this.speedFactor;
      this.x -= movement;

      if (this.x + this.img.width < 0) {
        this.x += this.img.width;
      }
    }
  }
};