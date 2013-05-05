// Utils.js

'use strict';

dime.Utils = {
  _lastDelta: 0,

  tick: function (delta) {
    this._lastDelta = delta;
  },

  pxPerSec: function (px) {
    return (px * this._lastDelta) / 1000;
  }
}