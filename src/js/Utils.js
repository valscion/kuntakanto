// Utils.js
// - Handy functions which don't belong to any certain file

'use strict';

dime.Utils = {
  _lastDelta: 0,

  tick: function (delta) {
    this._lastDelta = delta;
  },

  // This function can be used to do something at a fixed pace, for example to
  // move the player a certain amount of pixels per second.
  pxPerSec: function (px) {
    return (px * this._lastDelta) / 1000;
  }
}