export default class Painter {
  constructor (opts = {}) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = opts.w;
    this.canvas.height = opts.h;
  }// end constructor

  drawCircle (opts = {}) {
    const x = isNaN(opts.x) ? 0 : opts.x;
    const y = isNaN(opts.y) ? 0 : opts.y;
    const r = isNaN(opts.r) ? 0 : opts.r;
    const color = opts.color;
    const startAngle = 0;
    const endAngle = 360 * Math.PI / 180;

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, startAngle, endAngle, false);
    // this.ctx.stroke();
    this.ctx.fill();
  }// end drawCircle
};// end Painter