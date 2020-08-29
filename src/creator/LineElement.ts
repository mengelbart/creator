import AbstractElement from '@/creator/AbstractElement';
import AffineTransform from '@/creator/AffineTransform';

export default class LineElement extends AbstractElement {
  static component = 'LineElementComponent';

  constructor(
    id: string,
    width: number,
    height: number,
    transform: AffineTransform,
    stroke?: string,
    fill?: string,
  ) {
    super(id, LineElement.component, width, height, transform, stroke, fill);
  }
}
