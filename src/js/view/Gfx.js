// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,
  _bgScrollers: [],

  init: function (renderingContext) {
    this._ctx = renderingContext;
    this._player = new dime.Player();
    this._bgScrollers.push(new dime.BgScroller(1, 100));
    this._bgScrollers.push(new dime.BgScroller(2, 15.0));
  },

  setup: function () {
    this._player.setup();
    for (var i = this._bgScrollers.length - 1; i >= 0; i--) {
      this._bgScrollers[i].setup();
    }
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
  },

  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  }

};


dime.BgScroller = function (imgOrdinal, speedInPxPerSec) {
  this.x = 0;
  this.speedInPxPerSec = speedInPxPerSec || 0;
  this.imgOrdinal = imgOrdinal;
  this.img = null;
};

dime.BgScroller.prototype = {
  setup: function () {
    var self = this, i, tempImg;

    tempImg = new Image();
    tempImg.onload = function () {
      self.img = tempImg;
    }
    tempImg.onerror = function () {
      console.warn('Failed to load BgScroller ' + self.imgOrdinal);
    }
    tempImg.src = dime.Config.gfxDir + 'bg' + self.imgOrdinal + ".png";
  },

  draw: function (context) {
    if (this.isReady()) {
      context.save();

      context.translate(this.x, 0);
      context.drawImage(this.img, 0, 0);
      context.restore();
    }
  },

  isReady: function () {
    return !!this.img;
  },

  tick: function (delta) {
    if (this.isReady()) {
      var movement = dime.Utils.pxPerSec(this.speedInPxPerSec);
      this.x -= movement;
    }
  }
};