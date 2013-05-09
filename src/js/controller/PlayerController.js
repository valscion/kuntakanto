// PlayerController.js
// - handles player jumping and speeding

'use strict';

dime.PlayerController = function (player) {
  this.player = player;
};

dime.PlayerController.prototype = {

  _keysToHandle: ['space', 'left', 'right'],

  // Controls player running. If this is false, it means that last arrow pressed
  // was left or nothing was pressed, and if this is true it means that last
  // arrow pressed was right.
  _runningStatus: false,

  // How many milliseconds has passed since the last successful arrow hit
  // happened? -1 if there has been no successes at all.
  _lastSuccessfulHit: -1,

  handlesKeyDown: function (keyName) {
    return false;
  },

  handlesKeyUp: function (keyName) {
    var i, handledKey;
    for (i = 0; i < this._keysToHandle.length; i++) {
      handledKey = this._keysToHandle[i];
      if (handledKey === keyName) {
        return true;
      }
    }
    return false;
  },

  keyUp: function (keyName) {
    if (this.player.canJump()) {
      this.player.jump();
      dime.Audio.playSound();
    }
  }
};