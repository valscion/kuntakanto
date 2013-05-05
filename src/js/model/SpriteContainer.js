// SpriteContainer.js

'use strict';

dime.SpriteContainer = {
  _sprites: [],

  addSprite: function (sprite) {
    this._sprites.push(sprite);
  },

  loadAll: function (sprite) {
    this.loopSprites(function (sprite) {
      sprite.load();
    });
  },

  loopSprites: function (mappedFunction) {
    var i, loopedSprite;
    for (i = 0; i < this._sprites.length; i++) {
      loopedSprite = this._sprites[i];
      mappedFunction(loopedSprite);
    }
  },

  hasLoadedAllSprites: function () {
    var currentStatus = true;
    this.loopSprites(function (sprite) {
      if (currentStatus && !sprite.isReady()) {
        currentStatus = false;
      }
    });
    return currentStatus;
  },

  getAllSpritesThatAreReady: function () {
    var readySprites = [];
    this.loopSprites(function (sprite) {
      if (sprite.isReady()) {
        readySprites.push(sprite);
      }
    });
    return readySprites;
  },

  getSpriteIfReady: function (spriteClass) {
    var theSprite = null;
    this.loopSprites(function (sprite) {
      if (sprite.isReady() && sprite instanceof spriteClass) {
        theSprite = sprite;
      }
    });
    return theSprite;
  }
}