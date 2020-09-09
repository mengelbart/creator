import Matrix from '@/creator/matrix/Matrix';

interface MatrixMatrixOperation {
  apply(a: Matrix, b: Matrix): Matrix;
}

export default MatrixMatrixOperation;
