// Game.js

'use strict';

dime.Game = {

  _objectsToSetupAndTick: [dime.Gfx],

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

  startTicking: function () {
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    var lastTickTime = 0;
    function tick(timePassedSinceFirstTick) {
      var delta = timePassedSinceFirstTick - lastTickTime;
      lastTickTime = timePassedSinceFirstTick;

      callTickForAll.call(dime.Game, delta);
      requestAnimFrame(tick);
    }

    function callTickForAll(delta) {
      var i, loopedObject;
      for (i = 0; i < this._objectsToSetupAndTick.length; i++) {
        loopedObject = this._objectsToSetupAndTick[i];
        loopedObject.tick(delta);
      }
    }
    tick();
  }
};