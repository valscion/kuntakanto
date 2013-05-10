// Game.js
// - Handles the booting of the game and calling tick for everything. The only
//   thing you might need to modify here is the _objectsToSetupAndTick array.

'use strict';

dime.Game = {

  // All the objects to call setup() when game is loaded and tick() on every
  // frame.
  _objectsToSetupAndTick: [ dime.Utils, dime.Gfx, dime.Controllers, dime.Audio,
                            dime.ObstacleContainer],

  // All the objects to query isReady() function status for. Before everything
  // is ready, the game can't start.
  _objectsToQueryIsReady: [ dime.Gfx, dime.Audio, dime.ObstacleContainer ],

  // Objects to call onGameStart(), onGameEndToFailure() and
  // onGameEndToVictory() when the events happen.
  _objectsToCallOnGameEvent: [ dime.Utils, dime.Gfx, dime.Controllers ],

  // Game status is stored here for general lookup
  status: {
    distanceRanInPx: 0,
    gameOver: false,
    gameStarted: false
  },

  // Initializes the game and calls setup() for all the above objects
  init: function () {
    var i, loopedObject;
    for (i = 0; i < this._objectsToSetupAndTick.length; i++) {
      loopedObject = this._objectsToSetupAndTick[i];
      if ('function' === typeof loopedObject.setup) {
        loopedObject.setup();
      }
    }
    this.startTicking();
  },

  isEverythingReady: function () {
    for (var i = 0; i < this._objectsToQueryIsReady; i++) {
      if (!this._objectsToQueryIsReady[i].isReady())
        return false;
    }
    return true;
  },

  // If the game is not over and has started, return true. false otherwise
  isRunning: function () {
    return (this.status.gameStarted && !this.status.gameOver);
  },

  getDistanceLeftInKm: function () {
    return 10 - this.status.distanceRanInPx / 2000;
  },

  // Ends the game to a failure
  endToFailure: function () {
    var i, loopedObject;

    console.log("Game over, you failed!");
    this.status.gameOver = true;
    this.status.gameStarted = false;

    for (i = 0; i < this._objectsToCallOnGameEvent.length; i++) {
      loopedObject = this._objectsToCallOnGameEvent[i];
      if ('function' === typeof loopedObject.onGameEndToFailure) {
        loopedObject.onGameEndToFailure();
      }
    }
  },

  // Ends the game to a victory
  endToVictory: function () {
    var i, loopedObject;

    console.log("We have victory!");
    this.status.gameOver = true;
    this.status.gameStarted = false;
    this.status.distanceRanInPx = 20000;

    for (i = 0; i < this._objectsToCallOnGameEvent.length; i++) {
      loopedObject = this._objectsToCallOnGameEvent[i];
      if ('function' === typeof loopedObject.onGameEndToVictory) {
        loopedObject.onGameEndToVictory();
      }
    }
  },

  // Starts the ticking, but not necessarily the whole game
  startTicking: function () {
    // Cross-browser requestAnimationFrame
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame   ||
      window.mozRequestAnimationFrame      ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
    })();

    var lastTickTime = window.mozAnimationStartTime || 0;
    function tick(timePassedSinceFirstTick) {
      var delta = timePassedSinceFirstTick - lastTickTime;
      lastTickTime = timePassedSinceFirstTick;

      // Call the callTickForAll-function with "this" set to dime.Game and first
      // parameter set as delta.
      callTickForAll.call(dime.Game, delta);
      requestAnimFrame(tick);
    }

    function callTickForAll(delta) {
      var i, loopedObject;
      if (!this.isEverythingReady())
        return;

      for (i = 0; i < this._objectsToSetupAndTick.length; i++) {
        loopedObject = this._objectsToSetupAndTick[i];
        if ('function' === typeof loopedObject.tick) {
          loopedObject.tick(delta);
        }
      }
    }
    // We need to call tick manually only once. Here it is.
    tick(0);
  },

  // Starts the game itself
  start: function () {
    var i, loopedObject;

    this.status.gameStarted = true;
    this.status.gameOver = false;

    for (i = 0; i < this._objectsToCallOnGameEvent.length; i++) {
      loopedObject = this._objectsToCallOnGameEvent[i];
      if ('function' === typeof loopedObject.onGameStart) {
        loopedObject.onGameStart();
      }
    }
  }
};