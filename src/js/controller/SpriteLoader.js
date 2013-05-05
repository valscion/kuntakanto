// SpriteLoader.js

'use strict';

dime.SpriteLoader = {
  init: function () {
    var spriteClasses = [dime.PlayerSprite];
    var i, loopedSpriteClass, newSprite;

    for (i = 0; i < spriteClasses.length; i++) {
      loopedSpriteClass = spriteClasses[i];
      newSprite = loopedSpriteClass();
      dime.SpriteContainer.addSprite(newSprite);
    }

    dime.SpriteContainer.loadAll();
  }
}