import MatrixCell from '@/creator/matrix/MatrixCell';
import Vector from '@/creator/matrix/Vector';
// eslint-disable-next-line
import MatrixIterator from '@/creator/matrix/MatrixIterator';

export default abstract class Matrix implements Iterable<MatrixCell> {
  abstract rows(): number;

  abstract columns(): number;

  abstract setCell(i: number, j: number, value: number): void;

  abstract getCell(i: number, j: number): number;

  abstract getRow(i: number): Vector;

  abstract getColumn(j: number): Vector;

  abstract add(other: Matrix): Matrix;

  abstract subtract(other: Matrix): Matrix;

  abstract multiply(other: Matrix): Matrix;

  abstract multiplyVector(other: Vector): Vector;

  abstract copy(): Matrix;

  abstract zerosOfShape(rows: number, columns: number): Matrix;

  [Symbol.iterator](): Iterator<MatrixCell> {
    return new MatrixIterator(this);
  }
}
