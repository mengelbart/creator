import Point from '@/creator/Point';

export default class Resizer {
  static directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

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

  getRotation(): string {
    return `rotate(${this.rotation},${this.point.x},${this.point.y})`;
  }

  get direction(): string {
    const d = ((this.rotation % 360) + 360) % 360; // Fix negative modulo bug in js
    if (d < 22.5) {
      return Resizer.directions[Resizer.directions.indexOf(this.canonicalDirection)];
    }
    if (d < 67.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 1) % Resizer.directions.length
      ];
    }
    if (d < 112.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 2) % Resizer.directions.length
      ];
    }
    if (d < 157.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 3) % Resizer.directions.length
      ];
    }
    if (d < 202.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 4) % Resizer.directions.length
      ];
    }
    if (d < 247.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 5) % Resizer.directions.length
      ];
    }
    if (d < 292.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 6) % Resizer.directions.length
      ];
    }
    if (d < 337.5) {
      return Resizer.directions[
        (Resizer.directions.indexOf(this.canonicalDirection) + 7) % Resizer.directions.length
      ];
    }

    return Resizer.directions[Resizer.directions.indexOf(this.canonicalDirection)];
  }
}
