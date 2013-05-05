// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,

  init: function (renderingContext) {
    this._ctx = renderingContext;
  },

  draw: function () {
    this._ctx.fillText('Hello world!', 10, 10)
  }

};