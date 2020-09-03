import AbstractElement from '@/creator/AbstractElement';

export default class LineElement extends AbstractElement {
  static component = 'LineElementComponent';

  static editingComponent = 'LineElementEditingComponent';

  constructor(
    data: Partial<LineElement>,
  ) {
    super({
      component: LineElement.component,
      editingComponent: LineElement.editingComponent,
      ...data,
    });
  }
}
