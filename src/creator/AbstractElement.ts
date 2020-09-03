import AffineTransform from '@/creator/AffineTransform';

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
}
