// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,

  init: function (renderingContext) {
    this._ctx = renderingContext;
    this._player = new dime.Player();
  },

  setup: function () {
    this._player.init();
  },

  tick: function (delta) {
    this._player.tick(delta);
    this.clear();
    this.draw();
  },

  draw: function () {
    this._ctx.fillText('Hello world!', 10, 10);
    this._player.draw(this._ctx);
  },

  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};
