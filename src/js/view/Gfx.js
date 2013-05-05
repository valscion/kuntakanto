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
    this._player.tick();
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

dime.Player = function () {
  this.x = 0;
  this.y = 200;
  this.img = null;
  this.imgReady = false;
};

dime.Player.prototype = {
  init: function () {
    var self = this;
    this.img = new Image();
    this.img.onload = function () {
      self.imgReady = true;
    }
    this.img.onerror = function () {
      console.warn('Failed to load sprite for player');
    }
    this.img.src = dime.Config.gfxDir + "ukkeli.png";
  },

  draw: function (context) {
    if (this.imgReady) {
      context.drawImage(this.img, this.x, this.y);
    }
  },

  tick: function (delta) {
    if (!this.imgReady)
      return;
    this.x += dime.Utils.pxPerSec(40);
  }
};