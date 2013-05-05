// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,

  init: function (renderingContext) {
    this._ctx = renderingContext;
  },

  setup: function () {
    dime.SpriteLoader.loadAllSprites();
  },

  tick: function (delta) {
    this.clear();
    this.draw();
  },

  draw: function () {
    this._ctx.fillText('Hello world!', 10, 10)
  },

  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};