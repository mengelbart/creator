import Matrix from '@/creator/matrix/Matrix';
import Basic2DMatrix from '@/creator/matrix/Basic2DMatrix';

export default class AffineTransform {
  matrix: Matrix;

  constructor(
    scaleX = 1,
    shearX = 0,
    translateX = 0,
    scaleY = 1,
    shearY = 0,
    translateY = 0,
  ) {
    this.matrix = new Basic2DMatrix([
      [scaleX, shearX, translateX],
      [shearY, scaleY, translateY],
      [0, 0, 1],
    ]);
  }

  get string(): string {
    return `matrix(${this.matrix.getCell(0, 0)} ${this.matrix.getCell(1, 0)} `
    + `${this.matrix.getCell(0, 1)} ${this.matrix.getCell(1, 1)} `
    + `${this.matrix.getCell(0, 2)} ${this.matrix.getCell(1, 2)})`;
  }

  rotate(theta: number): void {
    const r = Math.PI / 180;
    const cos = Math.cos(theta * r);
    const sin = Math.sin(theta * r);
    this.matrix = this.matrix.multiply(new Basic2DMatrix([
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ]));
  }

  translate(dx: number, dy: number): void {
    this.matrix = this.matrix.multiply(new Basic2DMatrix([
      [1, 0, dx],
      [0, 1, dy],
      [0, 0, 1],
    ]));
  }

  getTranslateX(): number {
    return this.matrix.getCell(0, 2);
  }

  getTranslateY(): number {
    return this.matrix.getCell(1, 2);
  }

  setTranslateX(val: number): void {
    this.matrix.setCell(0, 2, val);
  }

  setTranslateY(val: number): void {
    this.matrix.setCell(1, 2, val);
  }

  getRotationRad(): number {
    return Math.atan2(-this.matrix.getCell(0, 1), this.matrix.getCell(0, 0));
  }

  getRotationDegree(): number {
    return this.getRotationRad() * (180 / Math.PI);
  }

  getInvertedMatrix(): Matrix {
    const aa = this.matrix.getCell(0, 0);
    const ab = this.matrix.getCell(1, 0);
    const ac = this.matrix.getCell(0, 1);
    const ad = this.matrix.getCell(1, 1);
    const atx = this.matrix.getCell(0, 2);
    const aty = this.matrix.getCell(1, 2);
    let det = aa * ad - ab * ac;
    if (!det) {
      return new Basic2DMatrix([]);
    }
    det = 1.0 / det;
    return new Basic2DMatrix([
      [ad * det, -ac * det, (ac * aty - ad * atx) * det],
      [-ab * det, aa * det, (ab * atx - aa * aty) * det],
      [0, 0, 1],
    ]);
  }
}
