// BgSignContainer.js
// - Class used to display all the different signs along the track

'use strict';

dime.BgSignContainer = function (baseLineY) {
  this.baseLineY = baseLineY;
  this.getSigns = function () { return []; };
  this.countOfReadySigns = 0;
};

dime.BgSignContainer.SIGN_LOCATIONS = [500, 5000, 9000, 140000, 18000, 20000];

dime.BgSignContainer.prototype = {
  setup: function () {
    var signsArray = [ 'kyltti1.png', 'kyltti2.png', 'kyltti3.png',
      'kyltti4.png', 'kyltti5.png', 'kyltti6.png' ];

    this.getSigns = dime.Utils.loadManyImages(signsArray);
  },

  isReady: function () {
    return this.getSigns().length > 0;
  },

  draw: function (context) {
    var signs, i, signImg, x;

    signs = this.getSigns();

    for (i = 0; i < signs.length; i++) {
      signImg = signs[i];
      x = dime.BgSignContainer.SIGN_LOCATIONS[i];
      x -= dime.Game.status.distanceRanInPx;
      context.drawImage(signImg, x, this.baseLineY);
    }
  },

  tick: function (delta) {
    // ...
  },

  onGameStart: function () {
    // ...
  }
};