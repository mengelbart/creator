import AbstractElement from '@/creator/AbstractElement';
import Point from '@/creator/Point';
import Vector from '@/creator/matrix/Vector';

export default class RectElement extends AbstractElement {
  static component = 'RectElementComponent';

  static editingComponent = 'RectElementEditingComponent';

  constructor(
    data: Partial<RectElement> = {},
  ) {
    super({
      component: RectElement.component,
      editingComponent: RectElement.editingComponent,
      ...data,
    });
  }

  getRotatePoint(): Point {
    return new Point({
      x: this.width / 2,
      y: -20,
    });
  }

  getCenterPoint(): Point {
    return this.transformPoint(new Point({
      x: this.width / 2,
      y: this.height / 2,
    }));
  }

  getResizePoint(direction: string): Point {
    switch (direction) {
      case 'n':
        return new Point({
          x: this.width / 2,
          y: 0,
        });

      case 'ne':
        return new Point({
          x: this.width,
          y: 0,
        });

      case 'e':
        return new Point({
          x: this.width,
          y: this.height / 2,
        });

      case 'se':
        return new Point({
          x: this.width,
          y: this.height,
        });

      case 's':
        return new Point({
          x: this.width / 2,
          y: this.height,
        });

      case 'sw':
        return new Point({
          x: 0,
          y: this.height,
        });

      case 'w':
        return new Point({
          x: 0,
          y: this.height / 2,
        });

      default:
      case 'nw':
        return new Point({
          x: 0,
          y: 0,
        });
    }
  }

  transformPoint(p: Point): Point {
    const v1 = this.transform.matrix.multiplyVector(new Vector([p.x, p.y, 1]));
    return new Point({ x: v1.get(0), y: v1.get(1) });
  }
}
