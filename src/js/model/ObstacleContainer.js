// ObstacleContainer.js
// - Handles collisions and drawing obstacles

'use strict';

dime.ObstacleContainer = {

  baseLineY: 400,
  obstacleSize: 40,
  obstacleOffset: 20,
  getObstacleImage: function () { return null; },
  distanceBetweenTwoObstacles: 1500,

  setup: function () {
    this.getObstacleImage = dime.Utils.loadImage('aita2.png');
  },

  isColliding: function (objX, objY, objWidth, objHeight) {
    var rect1 = { x: objX, y: objY, w: objWidth, h: objHeight };

    var x = this.distanceBetweenTwoObstacles;
    while (x < dime.Game.status.distanceRanInPx - 200) {
      x += this.distanceBetweenTwoObstacles;
    }

    var rect2 = {
      x: x + this.obstacleOffset,
      y: this.baseLineY + this.obstacleOffset,
      w: this.obstacleSize,
      h: this.obstacleSize
    };

    if (this._isRectRectCollision(rect1, rect2)) {
      return true;
    }
    return false;
  },

  _isRectRectCollision: function (rect1, rect2) {
    var left1 = rect1.x;
    var right1 = rect1.x + rect1.w;
    var top1 = rect1.y;
    var bottom1 = rect1.y + rect1.h;

    var left2 = rect2.x;
    var right2 = rect2.x + rect2.w;
    var top2 = rect2.y;
    var bottom2 = rect2.y + rect2.h;

    if (left1 > right2) return false;
    if (right1 < left2) return false;
    if (top1 > bottom2) return false;
    if (bottom1 < top2) return false;

    return true;
  },

  draw: function (context) {
    if (!this.isReady())
      return;

    var player = dime.Gfx._player;
    var playerX, playerY, playerW, playerH;

    playerX = player.getX() - dime.Game.status.distanceRanInPx;
    playerY = player.getY();
    playerW = player.getWidth();
    playerH = player.getHeight();

    var img = this.getObstacleImage();
    var x = this.distanceBetweenTwoObstacles - dime.Game.status.distanceRanInPx;

    while (x < -200) {
      x += this.distanceBetweenTwoObstacles;
    }

    context.drawImage(img, x, this.baseLineY);

    this._drawCollisionAreas(context);
  },

  _drawCollisionAreas: function (context) {
    var player = dime.Gfx._player;
    var playerX, playerY, playerW, playerH;

    playerX = player.getX() - dime.Game.status.distanceRanInPx;
    playerY = player.getY();
    playerW = player.getWidth();
    playerH = player.getHeight();

    var x = this.distanceBetweenTwoObstacles - dime.Game.status.distanceRanInPx;

    while (x < -200) {
      x += this.distanceBetweenTwoObstacles;
    }
    

    var rect2 = {
      x: x + this.obstacleOffset,
      y: this.baseLineY + this.obstacleOffset,
      w: this.obstacleSize,
      h: this.obstacleSize
    };

    context.strokeRect(playerX, playerY, playerW, playerH);
    context.strokeRect(rect2.x, rect2.y, rect2.w, rect2.h);
  },

  isReady: function () {
    return this.getObstacleImage() != null;
  },

  tick: function (delta) {
    var player = dime.Gfx._player;
    var playerX, playerY, playerW, playerH;

    playerX = player.getX();
    playerY = player.getY();
    playerW = player.getWidth();
    playerH = player.getHeight();

    if (this.isColliding(playerX, playerY, playerW, playerH)) {
      player.onCollision();
    }
  }
}