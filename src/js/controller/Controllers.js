// Controllers.js

'use strict';

dime.Controllers = {

  _keys: [
    { 'name': 'left',  'keyCode': 37, 'pressed': false },
    { 'name': 'right', 'keyCode': 39, 'pressed': false },
    { 'name': 'space', 'keyCode': 32, 'pressed': false }
  ],

  _controllers: [],

  init: function (document) {
    var self = this;
    document.onkeydown = function (event) {
      var keyCode = event.keyCode;
      self._onKeyDown(keyCode);
    };
    document.onkeyup = function (event) {
      var keyCode = event.keyCode;
      self._onKeyUp(keyCode);
    };

  },

  _onKeyDown: function (keyCode) {
    var key = this.keyFromKeyCodeOrFalse(keyCode);
    if (key) {
      key.pressed = true;
      this.triggerKeyDown(key);
    }
  },

  _onKeyUp: function (keyCode) {
    var key = this.keyFromKeyCodeOrFalse(keyCode);
    if (key && key.pressed) {
      key.pressed = false;
      this.triggerKeyUp(key);
    }
  },

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

  getKey: function (name) {
    var i, key;
    for (i = 0; i < this._keys.length; i++) {
      key = this._keys[i];
      if (key.name === name) {
        return key;
      }
    }
    throw new ReferenceError('Could not find key with name "' + name + '"');
  },

  triggerKeyDown: function (key) {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.handlesKeyDown && controller.handlesKeyDown(key.name)) {
        controller.keyDown(key.name);
      }
    }
  },

  triggerKeyUp: function (key) {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.handlesKeyUp && controller.handlesKeyUp(key.name)) {
        controller.keyUp(key.name);
      }
    }
  },

  setup: function () {
    this._controllers.push(new dime.PlayerController(dime.Gfx._player));
  },

  tick: function (delta) {
    var i, controller;
    for (i = 0; i < this._controllers.length; i++) {
      controller = this._controllers[i];
      if (controller.tick) {
        controller.tick(delta);
      }
    }
  }
};

dime.PlayerController = function (player) {
  this.player = player;
};

dime.PlayerController.prototype = {

  handlesKeyDown: function (keyName) {
    return false;
  },

  handlesKeyUp: function (keyName) {
    return keyName === 'space';
  },

  keyUp: function (keyName) {
    this.player.jump();
  }
};