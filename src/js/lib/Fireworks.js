/*
* 花火
*/

import Ball from './Ball';

const INITIAL_SIZE = 100;
const SPREAD = 5;

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
        color: 'rgb(150, 255, 255)',
        size: 2
      }));// end push
    }// end for
  }// end addBalls

  separatBalls () {
    this.balls.forEach((ball, index, array) => {
      if (ball.x > this.x)
        if (ball.y > this.y)
          ball.separat = 0;
        else
          ball.separat = 1;
      else
        if (ball.y > this.y)
          ball.separat = 2;
        else
          ball.separat = 3;
    });// end forEach
  }// end separatBalls

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