import MatrixMatrixOperation from '@/creator/matrix/MatrixMatrixOperation';
import Matrix from '@/creator/matrix/Matrix';

export default class MultiplyMatrixOperation implements MatrixMatrixOperation {
  // eslint-disable-next-line
  apply(a: Matrix, b: Matrix): Matrix {
    const result = a.zerosOfShape(a.rows(), b.columns());

    for (let j = 0; j < b.columns(); j += 1) {
      const column = b.getColumn(j);
      for (let i = 0; i < a.rows(); i += 1) {
        let value = 0;
        for (let k = 0; k < a.columns(); k += 1) {
          value += a.getCell(i, k) * column.get(k);
        }
        result.setCell(i, j, value);
      }
    }

    return result;
  }
}
