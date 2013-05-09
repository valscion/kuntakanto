// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,
  _bgScrollers: [],
  _gui: null,

  // Initializes the graphical context and private variables
  init: function (renderingContext) {
    var self = this;
    this._ctx = renderingContext;
    this._player = new dime.Player();
    this._bgScrollers.push(new dime.BgScroller(1, function speedCb1() {
      return (self._player.getSpeedInPxPerSec());
    }));
    this._bgScrollers.push(new dime.BgScroller(2, function speedCb2() {
      return (self._player.getSpeedInPxPerSec() * 0.1);
    }));
    this._gui = new dime.GUI();
  },

  // Sets up all that needs to be set up (player, scroller, gui...)
  setup: function () {
    this._player.setup();
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].setup();
    }
    this._gui.setup();
  },

  // Called on every frame, this handles ticking all the graphical things in
  // the game as well.
  tick: function (delta) {
    this._player.tick(delta);
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].tick(delta);
    }
    this.clear();
    this.draw();
  },

  // Draws all the graphics
  draw: function () {
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].draw(this._ctx);
    }
    this._player.draw(this._ctx);
    this._gui.draw(this._ctx);
  },

  // Clears the canvas context
  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};