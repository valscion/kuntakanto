// Utils.js
// - Handy functions which don't belong to any certain file

'use strict';

dime.Utils = {
  _lastDelta: 0,

  tick: function (delta) {
    this._lastDelta = delta;
  },

  // Loads a single image and returns a function which can then be queried for
  // the image. If the image has not yet been loaded, the function will return
  // null, so beware.
  loadImage: function (imageSource) {
    var imageLoaded = false, img;

    img = new Image();
    img.onload = function () {
      imageLoaded = true;
    }
    img.onerror = function () {
      console.warn('Failed to load ' + imageSource);
    }
    img.src = dime.Config.gfxDir + imageSource;

    return function () {
      return imageLoaded ? img : null;
    }
  },

  // Loads many images and returns them in an array in the same order as the
  // sources appeared in the given argument array. If all images have not been
  // loaded, this function will return an empty array.
  loadManyImages: function (imageSources) {
    var loadedImages = new Array(imageSources.length);
    var loadedCount = 0;
    var i;

    function loadSingleImage(ordinal) {
      var imageSource = imageSources[ordinal];
      var tempImg = new Image();
      tempImg.onload = function () {
        loadedImages[ordinal] = tempImg;
        loadedCount++;
      }
      tempImg.onerror = function () {
        console.warn('Failed to load image ' + imageSource);
      }
      tempImg.src = dime.Config.gfxDir + imageSource;
    };

    for (i = 0; i < imageSources.length; i++) {
      loadSingleImage(i);
    }

    return function () {
      return loadedCount == imageSources.length ? loadedImages : [];
    }
  },

  // This function can be used to do something at a fixed pace, for example to
  // move the player a certain amount of pixels per second.
  pxPerSec: function (px) {
    return (px * this._lastDelta) / 1000;
  },

  onGameStart: function () {
    this._lastDelta = 0;
  }
}