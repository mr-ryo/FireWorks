/*
* 花火のたま
*/

export default class Ball {

  constructor (param = {}) {
    this.distance = 0;// 距離
    this.accel = 0;// 速度・加速
    this.angle = 0;// 進む角度
    this.color = param.color;// 色
    this.size = param.size;// 大きさ
    this.x = param.x;// x座標
    this.y = param.y;// y座標
    this.pointX = 0;// 目標x座標
    this.pointY = 0;// 目標y座標
    this.pastX = [];// 過去のx座標
    this.pastY = [];// 過去のy座標
  }// end constructor

};// end Ball