// GUI.js

'use strict';

dime.GUI = function () {
  this.y = dime.Config.height - 40;
  this.img = null;
};

dime.GUI.TEXT_X_POS = 480;

dime.GUI.prototype = {
  setup: function () {
    var self = this, tempImg;

    tempImg = new Image();
    tempImg.onload = function () {
      self.img = tempImg;
    }
    tempImg.onerror = function () {
      console.warn('Failed to load GUI background');
    }
    tempImg.src = dime.Config.gfxDir + 'alapalkki.png';
  },

  tick: function (delta) {
    // ...
  },

  draw: function (context) {
    if (this.isReady()) {
      context.save();
      context.translate(0, this.y);
      context.drawImage(this.img, 0, 0);

      context.font = '24px Verdana';
      context.textBaseline = 'middle';
      context.textAlign = 'left';
      context.fillStyle = 'white';

      var distanceLeft = 10 - dime.Game.status.distanceRanInPx / 2000;
      distanceLeft = distanceLeft.toFixed(2);
      context.fillText(distanceLeft + ' km', dime.GUI.TEXT_X_POS, 20);
      context.restore();
    }
  },

  isReady: function () {
    return !!this.img;
  }
};