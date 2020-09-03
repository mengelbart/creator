export default class Point {
  x = 0;

  y = 0;

  constructor(data: Partial<Point>) {
    Object.assign(this, data);
  }
}
