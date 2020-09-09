import Matrix from '@/creator/matrix/Matrix';
import Vector from '@/creator/matrix/Vector';

interface MatrixVectorOperation {
  apply(a: Matrix, b: Vector): Vector;
}

export default MatrixVectorOperation;
