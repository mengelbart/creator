<template>
  <g>
    <g>
      <path :d="path"
            :transform="this.element.transform.string"
            :fill-opacity="0"
            @mousedown="$emit('mousedown', $event, element.id)"
      />
    </g>
    <g>
      <path v-for="(p, index) in cornerPaths"
            :key="index"
            :d="p.path"
            :transform="p.getRotation()"
            fill="#1a73e8"
            fill-opacity="1"
            stroke="#32a852"
            stroke-width="1"
            stroke-opacity="1"
            pointer-events="visiblePainted"
            :style="`cursor: ${p.direction}-resize`"
            @mousedown="startResize($event, p.direction)"
            @mouseup="$emit('mouseup', $event, element.id)"
      />
    </g>
  </g>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import RectElement from '@/creator/RectElement';
import Resizer from '@/creator/Resizer';
import Point from '@/creator/Point';

@Component
export default class RectElementEditingComponent extends Vue {
  @Prop(RectElement) element!: RectElement;

  @Prop(Point) dragOffset!: Point;

  @Prop(Point) dragPosition!: Point;

  @Prop(Point) resizePosition!: Point;

  dragOffsetX = 0;

  dragOffsetY = 0;

  resizeDirection = '';

  resizeOffsetX = 0;

  resizeOffsetY = 0;

  stroke = '';

  get path(): string {
    return `M 0 0 L ${this.element.width || 0} 0 ${this.element.width || 0} ${this.element.height || 0} 0 ${this.element.height} Z`;
  }

  get cornerPaths(): Resizer[] {
    return [
      { direction: 'n', point: this.element.getResizePoint('n') },
      { direction: 'ne', point: this.element.getResizePoint('ne') },
      { direction: 'e', point: this.element.getResizePoint('e') },
      { direction: 'se', point: this.element.getResizePoint('se') },
      { direction: 's', point: this.element.getResizePoint('s') },
      { direction: 'sw', point: this.element.getResizePoint('sw') },
      { direction: 'w', point: this.element.getResizePoint('w') },
      { direction: 'nw', point: this.element.getResizePoint('nw') },
    ].map((p) => new Resizer(p.direction, this.element.transform.getRotationDegree(), p.point));
  }

  @Watch('dragOffset')
  onDragOffsetChange(val: Point) {
    this.dragOffsetX = val.x - this.element.transform.getTranslateX();
    this.dragOffsetY = val.y - this.element.transform.getTranslateY();
  }

  @Watch('dragPosition')
  onDragPositionChange(val: Point) {
    const deltaX = this.element.transform.getTranslateX() - (val.x - this.dragOffsetX);
    const deltaY = this.element.transform.getTranslateY() - (val.y - this.dragOffsetY);
    this.element.transform.translate(-deltaX, -deltaY);
    this.$emit('update', this.element);
  }

  startResize(event: MouseEvent, direction: string) {
    this.resizeDirection = direction;
    this.resizeOffsetX = event.offsetX;
    this.resizeOffsetY = event.offsetY;
    this.$emit('resize', event);
  }

  @Watch('resizePosition')
  onResizePositionChange(val: Point) {
    const deltaX = this.resizeOffsetX - val.x;
    const deltaY = this.resizeOffsetY - val.y;

    switch (this.resizeDirection) {
      case ('n'):
        this.element.transform.translate(0, -deltaY);
        this.element.height += deltaY;
        break;

      case ('ne'):
        this.element.transform.translate(0, -deltaY);
        this.element.height += deltaY;
        this.element.width -= deltaX;
        break;

      case ('e'):
        this.element.width -= deltaX;
        break;

      case ('se'):
        this.element.height -= deltaY;
        this.element.width -= deltaX;
        break;

      case ('s'):
        this.element.height -= deltaY;
        break;

      case ('sw'):
        this.element.transform.translate(-deltaX, 0);
        this.element.width += deltaX;
        this.element.height -= deltaY;
        break;

      case ('w'):
        this.element.transform.translate(-deltaX, 0);
        this.element.width += deltaX;
        break;

      case ('nw'):
      default:
        this.element.width += deltaX;
        this.element.transform.translate(-deltaX, -deltaY);
        this.element.height += deltaY;
    }

    this.resizeOffsetX = val.x;
    this.resizeOffsetY = val.y;
    this.$emit('update', this.element);
  }
}
</script>
