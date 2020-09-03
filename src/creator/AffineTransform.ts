import Point from '@/creator/Point';

export default class AffineTransform {
  scaleX: number;

  scaleY: number;

  shearX: number;

  shearY: number;

  translateX: number;

  translateY: number;

  constructor(
    scaleX = 1,
    shearX = 0,
    translateX = 0,
    scaleY = 1,
    shearY = 0,
    translateY = 0,
  ) {
    this.scaleX = scaleX;
    this.shearX = shearX;
    this.translateX = translateX;
    this.scaleY = scaleY;
    this.shearY = shearY;
    this.translateY = translateY;
  }

  get string(): string {
    return `matrix(${this.scaleX} ${this.shearY} ${this.shearX} ${this.scaleY} ${this.translateX} ${this.translateY})`;
  }

  applyToPoint(point: Point): Point {
    return new Point({
      x: this.scaleX * point.x + this.shearX * point.y + this.translateX,
      y: this.scaleY * point.y + this.shearY * point.x + this.translateY,
    });
  }
}
