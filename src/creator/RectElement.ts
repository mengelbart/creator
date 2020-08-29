import AbstractElement from '@/creator/AbstractElement';
import AffineTransform from '@/creator/AffineTransform';

export default class RectElement extends AbstractElement {
  static component = 'RectElementComponent';

  constructor(
    id: string,
    width: number,
    height: number,
    transform: AffineTransform,
    stroke?: string,
    fill?: string,
  ) {
    super(id, RectElement.component, width, height, transform, stroke, fill);
  }
}
