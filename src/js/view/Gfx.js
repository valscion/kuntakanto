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
    this._player.draw(this._ctx);
    this._gui.draw(this._ctx);
  },

  // Clears the canvas context
  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};


dime.BgSignContainer = function (baseLineY) {
  this.baseLineY = baseLineY;
  this.signs = [];
  this.countOfReadySigns = 0;
};

dime.BgSignContainer.SIGN_LOCATIONS = [500, 5000, 9000, 140000, 18000, 20000];

dime.BgSignContainer.prototype = {
  setup: function () {
    var self = this, i, tempImg;

    for (i = 1; i <= dime.BgSignContainer.SIGN_LOCATIONS.length; i++) {
      tempImg = new Image();
      tempImg.onload = function () {
        self.countOfReadySigns++;
      }
      (function (frameId) {
        tempImg.onerror = function () {
          console.warn('Failed to load sign ' + frameId);
        }
      }(i));
      tempImg.src = dime.Config.gfxDir + "kyltti" + i + ".png";
      this.signs.push(tempImg);
    }
  },

  isReady: function () {
    return this.countOfReadySigns == this.signs.length;
  },

  draw: function (context) {
    var i, signImg, x;
    for (i = 0; i < this.signs.length; i++) {
      signImg = this.signs[i];
      x = dime.BgSignContainer.SIGN_LOCATIONS[i];
      x -= dime.Game.status.distanceRanInPx;
      context.drawImage(signImg, x, this.baseLineY);
    }
  },

  tick: function (delta) {
    // ...
  }
};