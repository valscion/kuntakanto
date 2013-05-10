// Gfx.js

'use strict';

dime.Gfx = {

  // Private variables
  _ctx: null,
  _player: null,
  _bgGraphics: [],
  _gui: null,
  _notifSigns: {
    start: null,
    failure: null,
    victory: null
  },
  _drawNotifSign: 'start',

  // Initializes the graphical context and private variables
  init: function (renderingContext) {
    var self = this;
    this._ctx = renderingContext;
    this._player = new dime.Player();

    this._bgGraphics.push(new dime.BgScroller(1, 1.0));
    this._bgGraphics.push(new dime.BgSignContainer(300));
    this._bgGraphics.push(new dime.BgScroller(2, 0.1));

    this._gui = new dime.GUI();

    this._notifSigns.start = new dime.NotificationSign('alkukyltti.png');
    this._notifSigns.failure = new dime.NotificationSign('haviokyltti.png');
    this._notifSigns.victory = new dime.NotificationSign('voittokyltti.png');
  },

  // Sets up all that needs to be set up (player, scroller, gui...)
  setup: function () {
    var i;
    this._player.setup();
    for (i = this._bgGraphics.length - 1; i >= 0; i--) {
      this._bgGraphics[i].setup();
    }
    this._gui.setup();

    this._notifSigns.start.setup();
    this._notifSigns.failure.setup();
    this._notifSigns.victory.setup();
  },

  // Tells whether all graphics are loaded.
  isReady: function () {
    if (!this._player.isReady()) return false;
    if (!this._gui.isReady()) return false;
    for (var i = this._bgGraphics.length - 1; i >= 0; i--) {
      if (!this._bgGraphics[i].isReady()) return false;
    }
    if (!this._notifSigns.start.isReady()) return false;
    if (!this._notifSigns.failure.isReady()) return false;
    if (!this._notifSigns.victory.isReady()) return false;

    return true;
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
    var i, notifSign;
    for (i = this._bgGraphics.length - 1; i >= 0; i--) {
      this._bgGraphics[i].draw(this._ctx);
    }
    dime.ObstacleContainer.draw(this._ctx);
    this._player.draw(this._ctx);
    this._gui.draw(this._ctx);

    if (this._drawNotifSign) {
      notifSign = this._notifSigns[this._drawNotifSign];
      notifSign.draw(this._ctx);
    }
  },

  // Clears the canvas context
  clear: function () {
    this._ctx.clearRect(0, 0, dime.Config.width, dime.Config.height);
  },

  onGameStart: function () {
    this._drawNotifSign = false;
    this._player.onGameStart();
    for (var i = this._bgGraphics.length - 1; i >= 0; i--) {
      this._bgGraphics[i].onGameStart();
    }
  },

  onGameEndToFailure: function () {
    this._drawNotifSign = 'failure';
  },

  onGameEndToVictory: function () {
    this._drawNotifSign = 'victory';
  }
};

dime.NotificationSign = function (imageSource) {
  this.imageSource = imageSource;
  this.getImage = function () { return null; }
};

dime.NotificationSign.prototype = {
  setup: function () {
    this.getImage = dime.Utils.loadImage(this.imageSource);
  },

  draw: function (context) {
    if (!this.isReady())
      return;
    // Find middle start coordinates
    var img = this.getImage();
    var x = (dime.Config.width - img.width) / 2;
    var y = (dime.Config.height - img.height) / 2;

    context.drawImage(img, x, y);
  },

  isReady: function () {
    return this.getImage() != null;
  }
}