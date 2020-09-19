import Point from '@/creator/Point';
import AffineTransform from '@/creator/AffineTransform';

export default class Resizer {
  static directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  canonicalDirection: string;

  transform: AffineTransform;

  point: Point;

  constructor(direction: string, transform: AffineTransform, p: Point) {
    this.canonicalDirection = direction;
    this.transform = transform;
    this.point = p;
  }

  get path(): string {
    return `M ${this.point.x - 4} ${this.point.y - 4} L ${this.point.x + 4} ${this.point.y - 4} `
            + `${this.point.x + 4} ${this.point.y + 4} ${this.point.x - 4} ${this.point.y + 4} Z`;
  }

  getTransform(): string {
    return this.transform.string;
  }

  getRotation(): string {
    return `rotate(${this.transform.getRotationDegree()},${this.point.x},${this.point.y})`;
  }

  get direction(): string {
    const d = ((this.transform.getRotationDegree() % 360) + 360) % 360; // Fix js modulo bug
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
