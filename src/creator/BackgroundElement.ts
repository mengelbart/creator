import AbstractElement from '@/creator/AbstractElement';

export default class BackgroundElement extends AbstractElement {
  static component = 'BackgroundElementComponent';

  static editingComponent = 'BackgroundElementEditingComponent';

  d: string;

  constructor(data: Partial<BackgroundElement> = {}) {
    super({
      component: BackgroundElement.component,
      editingComponent: BackgroundElement.editingComponent,
      ...data,
    });
    this.d = this.renderPath();
  }

  renderPath(): string {
    return `M 0 0 L ${this.width} 0 ${this.width} ${this.height} 0 ${this.height} Z`;
  }
}
