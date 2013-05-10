// Audio.js
// - Handles playing audio

dime.Audio = {

  setup: function () {
    this.jumpsound = document.getElementById('audiojump');
    this.jumpsound.load();
  },

  playSound: function () {
    if (this.isReady()) {
      this.jumpsound.play();
    }
  },

  isReady: function () {
    return this.jumpsound.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA;
  }

}