// main.js
// - The main starting point of the game. Responsible for calling the necessary
//   init() functions and setting up the canvas but nothing more.

'use strict';

// Initializes the whole freaking game. Called when the document has loaded.
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
  dime.Controllers.init(window.top.document);

  dime.Game.init();
};