// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,
  _bgScrollers: [],
  _gui: null,

  init: function (renderingContext) {
    var self = this;
    this._ctx = renderingContext;
    this._player = new dime.Player();
    this._bgScrollers.push(new dime.BgScroller(1, this._player, 1.0));
    this._bgScrollers.push(new dime.BgScroller(2, this._player, 0.1));
    this._gui = new dime.GUI();
  },

  setup: function () {
    this._player.setup();
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].setup();
    }
    this._gui.setup();
  },

  tick: function (delta) {
    this._player.tick(delta);
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].tick(delta);
    }
    this.clear();
    this.draw();
  },

  draw: function () {
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].draw(this._ctx);
    }
    this._player.draw(this._ctx);
    this._gui.draw(this._ctx);
  },

  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};