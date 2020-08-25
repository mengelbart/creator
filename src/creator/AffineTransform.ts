export default class AffineTransform {
  scaleX: number;

  scaleY: number;

  shearX: number;

  shearY: number;

  translateX: number;

  translateY: number;

  constructor(
    scaleX: number,
    scaleY: number,
    shearX: number,
    shearY: number,
    translateX: number,
    translateY: number,
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
