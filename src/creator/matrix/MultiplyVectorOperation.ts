import MatrixVectorOperation from '@/creator/matrix/MatrixVectorOperation';
import Vector from '@/creator/matrix/Vector';
import Matrix from '@/creator/matrix/Matrix';

export default class MultiplyVectorOperation implements MatrixVectorOperation {
  // eslint-disable-next-line
  apply(a: Matrix, b: Vector): Vector {
    const result = Vector.zero(a.rows());

    for (let i = 0; i < a.rows(); i += 1) {
      let value = 0;
      for (let j = 0; j < a.columns(); j += 1) {
        value += a.getCell(i, j) * b.get(j);
      }
      result.set(i, value);
    }

    return result;
  }
}
