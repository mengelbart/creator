import Matrix from '@/creator/matrix/Matrix';

interface MatrixOperation {
  apply(a: Matrix): Matrix;
}

export default MatrixOperation;
