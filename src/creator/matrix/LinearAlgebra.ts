import MatrixMatrixOperation from '@/creator/matrix/MatrixMatrixOperation';
import AddMatrixOperation from '@/creator/matrix/AddMatrixOperation';
import SubtractMatrixOperation from '@/creator/matrix/SubtractMatrixOperation';
import MultiplyMatrixOperation from '@/creator/matrix/MultiplyMatrixOperation';
import MatrixVectorOperation from '@/creator/matrix/MatrixVectorOperation';
import MultiplyVectorOperation from '@/creator/matrix/MultiplyVectorOperation';

export default class LinearAlgebra {
  static AddMatrix: MatrixMatrixOperation = new AddMatrixOperation();

  static SubtractMatrix: MatrixMatrixOperation = new SubtractMatrixOperation();

  static MultiplyMatrix: MatrixMatrixOperation = new MultiplyMatrixOperation();

  static MultplyVector: MatrixVectorOperation = new MultiplyVectorOperation();
}
