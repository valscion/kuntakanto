// BgSignContainer.js
// - Class used to display all the different signs along the track

'use strict';

dime.BgSignContainer = function (baseLineY) {
  this.baseLineY = baseLineY;
  this.signs = [];
  this.countOfReadySigns = 0;
};

dime.BgSignContainer.SIGN_LOCATIONS = [500, 5000, 9000, 140000, 18000, 20000];

dime.BgSignContainer.prototype = {
  setup: function () {
    var self = this, i, tempImg;

    for (i = 1; i <= dime.BgSignContainer.SIGN_LOCATIONS.length; i++) {
      tempImg = new Image();
      tempImg.onload = function () {
        self.countOfReadySigns++;
      }
      (function (frameId) {
        tempImg.onerror = function () {
          console.warn('Failed to load sign ' + frameId);
        }
      }(i));
      tempImg.src = dime.Config.gfxDir + "kyltti" + i + ".png";
      this.signs.push(tempImg);
    }
  },

  isReady: function () {
    return this.countOfReadySigns == this.signs.length;
  },

  draw: function (context) {
    var i, signImg, x;
    for (i = 0; i < this.signs.length; i++) {
      signImg = this.signs[i];
      x = dime.BgSignContainer.SIGN_LOCATIONS[i];
      x -= dime.Game.status.distanceRanInPx;
      context.drawImage(signImg, x, this.baseLineY);
    }
  },

  tick: function (delta) {
    // ...
  }
};