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

    // Don't handle anything when the game is not running
    if (!dime.Game.isRunning())
      return false;

    for (i = 0; i < this._keysToHandle.length; i++) {
      handledKey = this._keysToHandle[i];
      if (handledKey === keyName) {
        return true;
      }
    }
    return false;
  },

  keyUp: function (keyName) {
    if (keyName === 'space') {
      this.jump();
    }
    else if (keyName === 'left' || keyName === 'right') {
      this.run(keyName);
    }
  },

  jump: function () {
    if (this.player.canJump()) {
      this.player.jump();
      dime.Audio.playSound();
    }
  },

  run: function (keyName) {
    if (!this.player.midair) {
      if (keyName === 'right' && this._runningStatus) {
        this._runCorrectly();
      }
      else if (keyName === 'left' && !this._runningStatus) {
        this._runCorrectly();
      }
      else {
        this._runFail();
      }
    }
  },

  _runCorrectly: function () {
    this.player.modifySpeed(5);
    this._runningStatus = !this._runningStatus;
    this._lastSuccessfulHit = 0;
  },

  _runFail: function () {
    this.player.modifySpeed(-20);
  },

  tick: function (delta) {
    // Don't do anything when the game is not running
    if (!dime.Game.isRunning())
      return;

    // While in mid-air, only slow down the speed down a little
    if (this.player.midair) {
      var modifyAmount = dime.Utils.pxPerSec(-20);
      this.player.modifySpeed(modifyAmount);
    }
    else {
      if (this._lastSuccessfulHit > 0) {
        var secondsSinceSuccess = this._lastSuccessfulHit / 1000;
        var weighted = secondsSinceSuccess * ((this.player.getSpeed() * this.player.getSpeed()) * 0.000025);
        this.player.modifySpeed(-weighted);
      }

      this._lastSuccessfulHit += delta;
    }
  },

  // On game start, reset.
  onGameStart: function () {
    this._lastSuccessfulHit = -1;
    this._runningStatus = false;
  }
};