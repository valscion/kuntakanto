// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,
  _bgGraphics: [],
  _gui: null,

  // Initializes the graphical context and private variables
  init: function (renderingContext) {
    var self = this;
    this._ctx = renderingContext;
    this._player = new dime.Player();

    this._bgGraphics.push(new dime.BgScroller(1, 1.0));
    this._bgGraphics.push(new dime.BgSignContainer(300));
    this._bgGraphics.push(new dime.BgScroller(2, 0.1));

    this._gui = new dime.GUI();
  },

  // Sets up all that needs to be set up (player, scroller, gui...)
  setup: function () {
    var i;
    this._player.setup();
    for (i = this._bgGraphics.length - 1; i >= 0; i--) {
      this._bgGraphics[i].setup();
    }
    this._gui.setup();
  },

  // Tells whether all graphics are loaded.
  isReady: function () {
    if (!this._player.isReady()) return false;
    if (!this._gui.isReady()) return false;
    for (var i = this._bgGraphics.length - 1; i >= 0; i--) {
      if (!this._bgGraphics[i].isReady()) return false;
    }
  },

  // Called on every frame, this handles ticking all the graphical things in
  // the game as well.
  tick: function (delta) {
    var i;
    this._player.tick(delta);
    for (i = this._bgGraphics.length - 1; i >= 0; i--) {
      this._bgGraphics[i].tick(delta);
    }
    this.clear();
    this.draw();
    document.getElementById('debug').innerHTML =
      this._player.speedInPxPerSec.toFixed(2);
  },

  // Draws all the graphics
  draw: function () {
    var i;
    for (i = this._bgGraphics.length - 1; i >= 0; i--) {
      this._bgGraphics[i].draw(this._ctx);
    }
    dime.ObstacleContainer.draw(this._ctx);
    this._player.draw(this._ctx);
    this._gui.draw(this._ctx);
  },

  // Clears the canvas context
  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};
