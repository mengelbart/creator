import Point from '@/creator/Point';

export default class Resizer {
  canonicalDirection: string;

  rotation: number;

  point: Point;

  constructor(direction: string, rotation: number, p: Point) {
    this.canonicalDirection = direction;
    this.rotation = rotation;
    this.point = p;
  }

  get path(): string {
    return `M ${this.point.x - 4} ${this.point.y - 4} L ${this.point.x + 4} ${this.point.y - 4} `
            + `${this.point.x + 4} ${this.point.y + 4} ${this.point.x - 4} ${this.point.y + 4} Z`;
  }

  get direction(): string {
    return this.canonicalDirection;
  }
}
