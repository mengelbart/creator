export default class AffineTransform {
  scaleX: number;

  scaleY: number;

  shearX: number;

  shearY: number;

  translateX: number;

  translateY: number;

  constructor(
    scaleX = 1,
    scaleY = 0,
    shearX = 0,
    shearY = 1,
    translateX = 0,
    translateY = 0,
  ) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.shearX = shearX;
    this.shearY = shearY;
    this.translateX = translateX;
    this.translateY = translateY;
  }

  get string(): string {
    return `matrix(${this.scaleX} ${this.scaleY} ${this.shearX} ${this.shearY} ${this.translateX} ${this.translateY})`;
  }
}
