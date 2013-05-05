// Player.js
// - Represents the player

dime.Player = {
  x: 0,
  y: 0,
  sprite: null,

  init: function () {
    this.x = 50;
    this.y = 400;
    this.sprite = dime.PlayerSprite;
  },

  tick: function (delta) {

  },

  getDrawInformation: function () {
    var sprite = dime.SpriteContainer.getSpriteIfReady(dime.PlayerSprite);
    return {
      x: this.x,
      y: this.y,
      img: sprite.img
    }
  }
};