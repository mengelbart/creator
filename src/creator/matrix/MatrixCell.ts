export default class MatrixCell {
  value: number;

  rowIndex: number;

  columnIndex: number;

  constructor(value: number, rowIndex: number, columnIndex: number) {
    this.value = value;
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }
}
