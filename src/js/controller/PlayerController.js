// PlayerController.js
// - handles player jumping and speeding

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