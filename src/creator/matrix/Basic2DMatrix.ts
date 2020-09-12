import MatrixOperation from '@/creator/matrix/MatrixOperation';
import LinearAlgebra from '@/creator/matrix/LinearAlgebra';
import MatrixMatrixOperation from '@/creator/matrix/MatrixMatrixOperation';
import Matrix from '@/creator/matrix/Matrix';
import Vector from '@/creator/matrix/Vector';
import MatrixVectorOperation from '@/creator/matrix/MatrixVectorOperation';

export default class Basic2DMatrix extends Matrix {
  data: number[][];

  constructor(data: number[][]) {
    super();
    this.data = data;
  }

  apply(op: MatrixOperation): Matrix {
    return op.apply(this);
  }

  applyVector(op: MatrixVectorOperation, other: Vector): Vector {
    return op.apply(this, other);
  }

  applyMatrix(op: MatrixMatrixOperation, other: Matrix): Matrix {
    return op.apply(this, other);
  }

  add(other: Matrix): Matrix {
    return this.applyMatrix(LinearAlgebra.AddMatrix, other);
  }

  multiply(other: Matrix): Matrix {
    return this.applyMatrix(LinearAlgebra.MultiplyMatrix, other);
  }

  multiplyVector(other: Vector): Vector {
    return this.applyVector(LinearAlgebra.MultplyVector, other);
  }

  subtract(other: Matrix): Matrix {
    return this.applyMatrix(LinearAlgebra.SubtractMatrix, other);
  }

  copy(): Matrix {
    const newData: number[][] = [];
    for (let i = 0; i < this.data.length; i += 1) {
      newData.push([]);
      for (let j = 0; j < this.data[i].length; j += 1) {
        newData[i].push(this.data[i][j]);
      }
    }
    return new Basic2DMatrix(newData);
  }

  getCell(i: number, j: number): number {
    return this.data[i][j];
  }

  setCell(i: number, j: number, value: number): void {
    this.data[i][j] = value;
  }

  getRow(i: number): Vector {
    const result = Vector.zero(this.columns());

    for (let j = 0; j < this.columns(); j += 1) {
      result.set(j, this.getCell(i, j));
    }

    return result;
  }

  getColumn(j: number) {
    const result = Vector.zero(this.rows());

    for (let i = 0; i < this.rows(); i += 1) {
      result.set(i, this.getCell(i, j));
    }

    return result;
  }

  columns(): number {
    return this.data[0].length;
  }

  rows(): number {
    return this.data.length;
  }

  // eslint-disable-next-line
  zerosOfShape(rows: number, columns: number): Matrix {
    const data: number[][] = [];
    for (let i = 0; i < rows; i += 1) {
      data.push(new Array(columns).fill(0));
    }
    return new Basic2DMatrix(data);
  }
}
