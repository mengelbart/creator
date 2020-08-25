import AffineTransform from '@/creator/AffineTransform';

export default abstract class Element {
  id: string;

  component: string;

  width: number;

  height: number;

  transform: AffineTransform;

  protected constructor(
    id: string,
    component: string,
    width: number,
    height: number,
    transform: AffineTransform,
  ) {
    this.id = id;
    this.component = component;
    this.width = width;
    this.height = height;
    this.transform = transform;
  }
}
