// Game.js
// - Handles the booting of the game and calling tick for everything. The only
//   thing you might need to modify here is the _objectsToSetupAndTick array.

'use strict';

dime.Game = {

  // All the objects to call setup() when game is loaded and tick() on every
  // frame.
  _objectsToSetupAndTick: [dime.Utils, dime.Gfx, dime.Controllers],

  // Game status is stored here for general lookup
  status: {
    distanceRanInPx: 0
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

  // Starts the game
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
      for (i = 0; i < this._objectsToSetupAndTick.length; i++) {
        loopedObject = this._objectsToSetupAndTick[i];
        if ('function' === typeof loopedObject.tick) {
          loopedObject.tick(delta);
        }
      }
    }
    // We need to call tick manually only once. Here it is.
    tick(0);
  }
};