// main.js

'use strict';

dime.init = function () {

  function findCanvasElement() {
    var canvasElement = document.getElementById('gameCanvas');

    if (canvasElement) {
      return canvasElement;
    }
    else {
      throw new Error('Page needs to have a canvas with id "gameCanvas"');
    }
  }

  function setupCanvasElement(canvas) {
    canvas.width = dime.Config.width;
    canvas.height = dime.Config.height;
  }

  var canvas = findCanvasElement();
  setupCanvasElement(canvas);
  dime.Gfx.init(canvas.getContext('2d'));

  dime.Game.init();
};