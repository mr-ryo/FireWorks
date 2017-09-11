import Painter from './lib/Painter.js';
import Timestamp from './lib/Timestamp.js';
import Fireworks from './lib/Fireworks';
import $ from 'jquery';

const canvas = $('.canvas').get(0);
const canvasWidth = $(window).width();
const canvasHeight = $(window).height();

const painter = new Painter({
  canvas: canvas,
  w: canvasWidth,
  h: canvasHeight
});// end painter
const timestamp = new Timestamp({
});// end timestamp

const FIREWORKS_DURATION = 1000;
const FIREWORKS_FADEOUT = 250;
const FIREWORKS_VOLUME = 300;
const GRAVITY = 1.15;
const LOCUS_LIMIT = 11;
const LOCUS_COE = 0.3;

const fireworks = [];

const addFireworks = () => {
  fireworks.push(new Fireworks({
    x: canvasWidth * 0.5,
    y: canvasHeight * 0.5,
    volume: FIREWORKS_VOLUME
  }));// end push

  fireworks[0].addBalls();
  fireworks[0].calcDistance();
  fireworks[0].calcAngle();
  fireworks[0].calcPoint();
  fireworks[0].separatColor();
  timestamp.addTime();
}// end addFireworks

const drawFireworks = (array) => {
  const time = timestamp.calcTime();
  let x = 0;
  let y = 0;
  let alpha = 0;
  let v1 = time / FIREWORKS_DURATION;
  let v2 = (time - FIREWORKS_DURATION + FIREWORKS_FADEOUT) / FIREWORKS_FADEOUT;
  v1 = v1 >= 1 ? 1 : v1;
  v2 = v2 >= 0 ? v2 : 0;
  v2 = v2 >= 1 ? 1 : v2;

  painter.ctx.fillStyle = 'rgb(0, 0, 40)';
  painter.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  array.forEach((key, index, array) => {
    key.balls.forEach((ball, ballIndex, balls) => {
      if (v1 != 1)
        ball.pointY += GRAVITY;

      x = ball.x + ball.pointX * v1;
      y = ball.y + ball.pointY * v1;

      painter.ctx.save();
      ball.pastX.forEach((PointX, pIndex, xPoints) => {
        alpha = (1 - v2) * (pIndex / xPoints.length * LOCUS_COE);

        painter.ctx.globalAlpha = alpha;
        painter.drawCircle({
          x: PointX,
          y: ball.pastY[pIndex],
          r: ball.size,
          color: ball.color,
          w: 1
        });
      })// end forEach
      painter.ctx.restore();

      if (ball.pastX.length >= LOCUS_LIMIT) {
        ball.pastX.shift();
        ball.pastY.shift();
      }// end if

      ball.pastX.push(x);
      ball.pastY.push(y);
    });// end forEach
  });// end forEach

  if (time > FIREWORKS_DURATION)
    array.shift();
}// end drawFireworks

const masterDraw = () => {
  const loop = () => {
    drawFireworks(fireworks);
    window.requestAnimationFrame(loop);
  }// end loop

  window.requestAnimationFrame(loop);
}// end masterDraw

addFireworks();
masterDraw();