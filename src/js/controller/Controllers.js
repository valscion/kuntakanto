// Controllers.js

'use strict';

dime.Controllers = {

  _keys: [
    { 'name': 'left',  'keyCode': 37, 'pressed': false },
    { 'name': 'right', 'keyCode': 39, 'pressed': false },
    { 'name': 'space', 'keyCode': 32, 'pressed': false }
  ],

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
    }
  },

  _onKeyUp: function (keyCode) {
    var key = this.keyFromKeyCodeOrFalse(keyCode);
    if (key && key.pressed) {
      key.pressed = false;
      this.triggerKey(key);
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

  triggerKey: function (key) {
    console.dir(key);
    if (key.name === 'space') {
      dime.Gfx._player.jump();
    }
  },

  setup: function () {
    // ...
  },

  tick: function (delta) {
    // ...
  }
};

