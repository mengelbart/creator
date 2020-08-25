import Element from '@/creator/Element';

export default class BackgroundElement implements Element {
  backgroundComponent = 'BackgroundElementComponent';

  elementId: string;

  x: number;

  y: number;

  width: number;

  height: number;

  d: string;

  fill: string;

  constructor(
    elementId: string,
    x: number,
    y: number,
    width: number,
    height: number,
    fill: string,
  ) {
    this.elementId = elementId;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;

    this.d = this.renderPath();
  }

  component(): string {
    return this.backgroundComponent;
  }

  id(): string {
    return this.elementId;
  }

  renderPath(): string {
    return `M ${this.x} ${this.y} L ${this.width} ${this.y} ${this.width} ${this.height} ${this.y} ${this.height} Z`;
  }
}
