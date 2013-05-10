// GameStateController.js
// - The controller responsible for changing between different game modes

'use strict';

dime.GameStateController = function () {
};

dime.GameStateController.prototype = {
  handlesKeyUp: function (keyName) {
    // Only handle keys when game has not started or game is over
    if (!dime.Game.status.gameStarted || dime.Game.status.gameOver) {
      if (keyName === 'space')
        return true;
    }
  },

  keyUp: function (keyName) {
    dime.Game.start();
  }
};