// BgScroller.js
// - A repeating background image that scrolls with some speed

'use strict';

// Constructor for setting up a new background scroller with the given ordinal
// and a callback to query scroller speed from.
dime.BgScroller = function (imgOrdinal, speedCallback) {
  this.imgOrdinal = imgOrdinal;
  this.getMovementSpeed = speedCallback;
  this.x = 0;
  this.img = null;
};

dime.BgScroller.prototype = {
  // Sets up the scrolling image based on the image ordinal
  setup: function () {
    var self = this, tempImg;

    tempImg = new Image();
    tempImg.onload = function () {
      self.img = tempImg;
    }
    tempImg.onerror = function () {
      console.warn('Failed to load BgScroller ' + self.imgOrdinal);
    }
    tempImg.src = dime.Config.gfxDir + 'bg' + self.imgOrdinal + ".png";
  },

  // Draws the scroller to the given background
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

  // Returns a boolean indicating whether the background has finished loading
  // or not.
  isReady: function () {
    return !!this.img;
  },

  // Called on every tick of the game
  tick: function (delta) {
    if (this.isReady()) {
      var movement = dime.Utils.pxPerSec(this.getMovementSpeed());
      this.x -= movement;

      if (this.x + this.img.width < 0) {
        this.x += this.img.width;
      }
    }
  }
};