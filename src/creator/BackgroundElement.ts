import Element from '@/creator/Element';
import AffineTransform from '@/creator/AffineTransform';

export default class BackgroundElement extends Element {
  static component = 'BackgroundElementComponent';

  x: number;

  y: number;

  d: string;

  fill: string;

  constructor(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    transform: AffineTransform,
    fill: string,
  ) {
    super(
      id,
      BackgroundElement.component,
      width,
      height,
      transform,
    );

    this.x = x;
    this.y = y;
    this.fill = fill;

    this.d = this.renderPath();
  }

  renderPath(): string {
    return `M ${this.x} ${this.y} L ${this.width} ${this.y} ${this.width} ${this.height} ${this.y} ${this.height} Z`;
  }
}
