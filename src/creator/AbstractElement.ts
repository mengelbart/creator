import AffineTransform from '@/creator/AffineTransform';

export default abstract class AbstractElement {
  id: string;

  component: string;

  width: number;

  height: number;

  transform: AffineTransform;

  fill: string;

  stroke: string;

  protected constructor(
    id: string,
    component: string,
    width: number,
    height: number,
    transform: AffineTransform,
    stroke?: string,
    fill?: string,
  ) {
    this.id = id;
    this.component = component;
    this.width = width;
    this.height = height;
    this.transform = transform;
    this.stroke = stroke || '';
    this.fill = fill || '';
  }
}
