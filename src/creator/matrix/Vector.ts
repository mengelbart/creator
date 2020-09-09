export default class Vector {
  data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  static zero(length: number): Vector {
    return new Vector(new Array(length).fill(0));
  }

  set(i: number, value: number): void {
    this.data[i] = value;
  }

  get(i: number): number {
    return this.data[i];
  }
}
