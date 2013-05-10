// GUI.js

'use strict';

dime.GUI = function () {
  this.y = dime.Config.height - 40;
  this.getImage = function () { return null; };
};

dime.GUI.TEXT_X_POS = 480;

dime.GUI.prototype = {
  setup: function () {
    this.getImage = dime.Utils.loadImage('alapalkki.png');
  },

  tick: function (delta) {
    // ...
  },

  draw: function (context) {
    if (this.isReady()) {
      context.save();
      context.translate(0, this.y);
      context.drawImage(this.getImage(), 0, 0);

      context.font = '24px Verdana';
      context.textBaseline = 'middle';
      context.textAlign = 'left';
      context.fillStyle = 'white';

      var distanceLeft = dime.Game.getDistanceLeftInKm();
      distanceLeft = distanceLeft.toFixed(2);
      context.fillText(distanceLeft + ' km', dime.GUI.TEXT_X_POS, 20);
      context.restore();
    }
  },

  isReady: function () {
    return this.getImage() != null;
  }
};