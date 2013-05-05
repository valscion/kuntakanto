// main.js

var dime = {};

window.addEventListener('load', function () {
  var canvas, ctx;

  canvas = document.getElementsByTagName('canvas')[0];

  canvas.width = 800;
  canvas.height = 600;

  ctx = canvas.getContext('2d');
  dime.canvas = canvas;
  dime.ctx = ctx;

  ctx.fillText('Hello world!', 20, 20);
});