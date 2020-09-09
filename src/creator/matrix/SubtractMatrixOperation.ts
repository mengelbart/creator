import MatrixMatrixOperation from '@/creator/matrix/MatrixMatrixOperation';
import Matrix from '@/creator/matrix/Matrix';

export default class SubtractMatrixOperation implements MatrixMatrixOperation {
  // eslint-disable-next-line
  apply(a: Matrix, b: Matrix): Matrix {
    const result = a.copy();

    // eslint-disable-next-line
    for (const { columnIndex: j, rowIndex: i, value: x } of b) {
      result.setCell(i, j, result.getCell(i, j) - x);
    }

    return result;
  }
}
