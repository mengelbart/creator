// eslint-disable-next-line
import Matrix from '@/creator/matrix/Matrix';
import MatrixCell from '@/creator/matrix/MatrixCell';

export default class MatrixIterator implements Iterator<MatrixCell> {
  matrix: Matrix;

  limit: number;

  i: number;

  constructor(m: Matrix) {
    this.matrix = m;
    this.limit = m.rows() * m.columns();
    this.i = -1;
  }

  next(): IteratorResult<MatrixCell> {
    if (this.i + 1 < this.limit) {
      this.i += 1;
      const i = this.getRowIndex();
      const j = this.getColumnIndex();
      return {
        done: false,
        value: new MatrixCell(this.matrix.getCell(i, j), i, j),
      };
    }

    return {
      done: true,
      value: null,
    };
  }

  private getRowIndex(): number {
    return Math.floor(this.i / this.matrix.columns());
  }

  private getColumnIndex(): number {
    return this.i - this.getRowIndex() * this.matrix.columns();
  }
}
