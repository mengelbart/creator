import Element from '@/creator/Element';
import AffineTransform from '@/creator/AffineTransform';

export default class LineElement extends Element {
  static component = 'LineElementComponent';

  stroke: string;

  constructor(
    id: string,
    width: number,
    height: number,
    transform: AffineTransform,
    stroke: string,
  ) {
    super(id, LineElement.component, width, height, transform);
    this.stroke = stroke;
  }
}
