import Point from '@/creator/Point';
import Matrix from '@/creator/matrix/Matrix';
import Basic2DMatrix from '@/creator/matrix/Basic2DMatrix';
import Vector from '@/creator/matrix/Vector';

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
    return `matrix(${this.matrix.getCell(0, 0)} ${this.matrix.getCell(0, 1)} `
    + `${this.matrix.getCell(1, 0)} ${this.matrix.getCell(1, 1)} `
    + `${this.matrix.getCell(0, 2)} ${this.matrix.getCell(1, 2)})`;
  }

  applyToPoint(point: Point): Point {
    const result = this.matrix.multiplyVector(new Vector([point.x, point.y, 1]));
    return new Point({ x: result.get(0), y: result.get(1) });
  }

  translate(vector: Vector): void {
    this.matrix = this.matrix.add(new Basic2DMatrix([
      [0, 0, vector.get(0)],
      [0, 0, vector.get(1)],
      [0, 0, 1],
    ]));
  }

  getTranslateX(): number {
    return this.matrix.getCell(0, 2);
  }

  getTranslateY(): number {
    return this.matrix.getCell(1, 2);
  }
}
