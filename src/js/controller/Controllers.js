// Controllers.js
// - A general object that will handle all specific controllers.

'use strict';

dime.Controllers = {

  // All the keys this game will handle
  _keys: [
    { 'name': 'left',  'keyCode': 37, 'pressed': false },
    { 'name': 'right', 'keyCode': 39, 'pressed': false },
    { 'name': 'space', 'keyCode': 32, 'pressed': false }
  ],

  // Specific controllers will be stored here, see setup() method
  _controllers: [],

  // Initializes the key listeners
  init: function (document) {
    var self = this;
    document.onkeydown = function (event) {
      var keyCode = event.keyCode;
      self._onKeyDown(keyCode);
      // Don't let the browser do anything silly.
      return false;
    };
    document.onkeyup = function (event) {
      var keyCode = event.keyCode;
      self._onKeyUp(keyCode);
      // Don't let the browser do anything silly.
      return false;
    };

  },

  // Called when a key is pressed down
  _onKeyDown: function (keyCode) {
    var key = this.keyFromKeyCodeOrFalse(keyCode);
    if (key) {
      key.pressed = true;
      this.triggerKeyDown(key);
    }
  },

  // Called when a key is released
  _onKeyUp: function (keyCode) {
    var key = this.keyFromKeyCodeOrFalse(keyCode);
    if (key && key.pressed) {
      key.pressed = false;
      this.triggerKeyUp(key);
    }
  },

  // Returns a key from _keys array which has the given keyCode or false, if
  // none was found.
  keyFromKeyCodeOrFalse: function (keyCode) {
    var i, key;
    for (i = 0; i < this._keys.length; i++) {
      key = this._keys[i];
      if (key.keyCode === keyCode) {
        return key;
      }
    }
    return false;
  },

  // Triggers keyDown() method for all applicable controllers when a key is
  // pressed down.
  triggerKeyDown: function (key) {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.handlesKeyDown && controller.handlesKeyDown(key.name)) {
        controller.keyDown(key.name);
      }
    }
  },

  // Triggers keyUp() method for all applicable controllers when a key is
  // released.
  triggerKeyUp: function (key) {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.handlesKeyUp && controller.handlesKeyUp(key.name)) {
        controller.keyUp(key.name);
      }
    }
  },

  // Sets up all the controllers
  setup: function () {
    this._controllers.push(new dime.PlayerController(dime.Gfx._player));
    this._controllers.push(new dime.GameStateController());
  },

  // Call tick() for all controllers that want to get ticked.
  tick: function (delta) {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.tick) {
        controller.tick(delta);
      }
    }
  },

  // Call onGameStart() on every controller which has that function when this
  // is called, when the game is started.
  onGameStart: function () {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.onGameStart) {
        controller.onGameStart();
      }
    }
  }
};

// The controller responsible for changing between different game modes
dime.GameStateController = function () {
};

dime.GameStateController.prototype = {
  handlesKeyUp: function (keyName) {
    // Only handle keys when game has not started or game is over
    if (!dime.Game.status.gameStarted || dime.Game.status.gameOver) {
      if (keyName === 'space')
        return true;
    }
  },

  keyUp: function (keyName) {
    if (!dime.Game.status.gameStarted && !dime.Game.status.gameOver) {
      // Start the game.
      dime.Game.start();
    }
  }
};