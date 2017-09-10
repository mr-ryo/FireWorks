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

const fireworks = [];

const addFireworks = () => {
  fireworks.push(new Fireworks({
    x: canvasWidth * 0.5,
    y: canvasHeight * 0.5,
    volume: 100
  }));// end push

  fireworks[0].addBalls();
  fireworks[0].separatBalls();
  fireworks[0].calcDistance();
  fireworks[0].calcAngle();
  fireworks[0].calcPoint();
  timestamp.addTime();
}// end addFireworks

const drawFireworks = (array) => {
  const time = timestamp.calcTime();
  let v = time / FIREWORKS_DURATION;
  v = v >= 1 ? 1 : v;

  painter.ctx.fillStyle = 'rgb(0, 0, 50)';
  painter.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  array.forEach((key, index, array) => {
    painter.drawCircle({
      x: key.x,
      y: key.y,
      r: 50,
      w: 1
    });// end drawCircle

    key.balls.forEach((ball, ballIndex, balls) => {
      painter.drawCircle({
        x: ball.x + ball.pointX * v,
        y: ball.y + ball.pointY * v,
        r: ball.size,
        color: ball.color,
        w: 1
      });// end drawCircle
    });// end forEach
  });// end forEach
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