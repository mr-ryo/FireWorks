/*
* 花火
*/

import Ball from './Ball';

const INITIAL_SIZE = 40;// 直径
const SPREAD = 6.5;
const BALL_SIZE = 3;
const START_COLOR = {
  R: 150,
  G: 255,
  B: 255
}// end START_COLOR
const END_COLOR = {
  R: 255,
  G: 200,
  B: 200
}// end END_COLOR

export default class Fireworks {

  constructor (param = {}) {
    this.x = param.x; // x座標
    this.y = param.y; // y座標
    this.volume = param.volume; // 花火を形成する玉の個数
    this.balls = [];// 花火を形成する玉の入れ物
  }// end constructor

  addBalls () {
    let x;
    let y;

    for (let i = 0, size = this.volume; i < size; ++i) {
      [x, y] = this.calcStartPoint(this.x, this.y);

      this.balls.push(new Ball({
        x: x,
        y: y,
        color: 'rgb('+ START_COLOR.R +','+ START_COLOR.G +','+ START_COLOR.B +')',
        size: BALL_SIZE
      }));// end push

      this.balls[this.balls.length - 1].pastX.push(x);
      this.balls[this.balls.length - 1].pastY.push(y);
    }// end for
  }// end addBalls

  separatColor () {
    this.balls.forEach((ball, index, array) => {
      if (ball.distance > INITIAL_SIZE * 0.5 * 0.6)
        ball.color = 'rgb('+ END_COLOR.R +','+ END_COLOR.G +','+ END_COLOR.B +')';
    });// end forEach
  }// end separatColor

  calcStartPoint (x1, y1) {
    let x2;
    let y2;
    let distance;

    while (true) {
      x2 = Math.floor(Math.random() * INITIAL_SIZE + (x1 - INITIAL_SIZE * 0.5));
      y2 = Math.floor(Math.random() * INITIAL_SIZE + (y1 - INITIAL_SIZE * 0.5));
      distance = getDistanceFromPoints({x: x1, y: y1}, {x: x2, y: y2});

      if (distance <= INITIAL_SIZE * 0.5)
        break;
    }// end while

    return [x2, y2];
  }// end calcStartPoint

  calcDistance () {
    this.balls.forEach((ball, index, array) => {
      ball.distance = getDistanceFromPoints(ball, {x: this.x, y: this.y});
    });// end forEach
  }// end calcDistance

  calcAngle () {
    this.balls.forEach((ball, index, array) => {
      ball.angle = getAngleFromPoints({x: this.x, y: this.y}, ball);
    });// end forEach
  }// end calcAngle

  calcPoint () {
    this.balls.forEach((ball, index, array) => {
      [ball.pointX, ball.pointY] = getPoint(ball.angle, ball.distance * SPREAD);
    });// end forEach
  }// end calcPoint
};// end Fireworks

function getAngleFromPoints(p1, p2) {
  const radian = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  return radian;
}// end getAngleFromPoints

function getDistanceFromPoints(p1, p2) {
  const distance = Math.abs(Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)));
  return distance;
}// end getDistanceFromPoints

function getPoint(angle, distance) {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return [x, y];
}// end getPoint