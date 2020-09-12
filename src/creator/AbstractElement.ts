import AffineTransform from '@/creator/AffineTransform';
import Basic2DMatrix from '@/creator/matrix/Basic2DMatrix';

export default abstract class AbstractElement {
  id = '';

  component = ''; // TODO: Default components?

  editingComponent = ''; // TODO: Default components?

  width = 0;

  height = 0;

  transform = new AffineTransform();

  stroke = '';

  fill = '';

  fillOpacity = 0;

  protected constructor(data: Partial<AbstractElement> = {}) {
    Object.assign(this, data);
  }

  rotate(theta: number) {
    const dx = -this.width / 2;
    const dy = -this.height / 2;

    const r = Math.PI / 180;
    const cos = Math.cos(theta * r);
    const sin = Math.sin(theta * r);

    this.transform.matrix = this.transform.matrix.multiply(new Basic2DMatrix([
      [1, 0, -dx],
      [0, 1, -dy],
      [0, 0, 1],
    ]).multiply(new Basic2DMatrix([
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ]).multiply(new Basic2DMatrix([
      [1, 0, dx],
      [0, 1, dy],
      [0, 0, 1],
    ]))));
  }
}
