import AbstractElement from '@/creator/AbstractElement';

export default class RectElement extends AbstractElement {
  static component = 'RectElementComponent';

  static editingComponent = 'RectElementEditingComponent';

  constructor(
    data: Partial<RectElement> = {},
  ) {
    super({
      component: RectElement.component,
      editingComponent: RectElement.editingComponent,
      ...data,
    });
  }
}
