// BgScroller.js
// - A repeating background image that scrolls with some speed

'use strict';

// Constructor for setting up a new background scroller with the given ordinal
// and a speed factor related to player run amount
dime.BgScroller = function (imgOrdinal, speedFactor) {
  this.imgOrdinal = imgOrdinal;
  this.speedFactor = speedFactor;
  this.x = 0;
  this.getImage = function () { return null; };
};

dime.BgScroller.prototype = {
  // Sets up the scrolling image based on the image ordinal
  setup: function () {
    this.getImage = dime.Utils.loadImage('bg' + this.imgOrdinal + ".png");
  },

  // Draws the scroller to the given background
  draw: function (context) {
    if (this.isReady()) {
      context.save();

      context.translate(this.x, 0);
      context.drawImage(this.getImage(), 0, 0);

      if (this.x + this.getImage().width <= dime.Config.width) {
        context.translate(this.getImage().width, 0);
        context.drawImage(this.getImage(), 0, 0);
      }
      context.restore();
    }
  },

  // Returns a boolean indicating whether the background has finished loading
  // or not.
  isReady: function () {
    return this.getImage() != null;
  },

  // Called on every tick of the game
  tick: function (delta) {
    if (this.isReady()) {
      this.x = -dime.Game.status.distanceRanInPx * this.speedFactor;

      while (this.x + this.getImage().width < 0) {
        this.x += this.getImage().width;
      }
    }
  },

  onGameStart: function () {
    this.x = 0;
  }
};