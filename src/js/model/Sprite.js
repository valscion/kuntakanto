// Sprite.js
// - A generic class from which all different sprites derive from

dime.Sprite = function (source) {
  this._imageSource = source;
  this._ready = false;
  this._img = null;
}

dime.Sprite.prototype = {
  isReady: function () {
    return this._ready;
  },

  load: function () {
    var self = this;

    this._img = new Image();
    this._img.onload = function () {
      self._ready = true;
    }
    this._img.src = this._imageSource;
  }
}