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
      <path :d="rotatePath.path"
            :transform="rotatePath.getTransform()"
            fill="#1a73e8"
            stroke="#32a852"
            stroke-width="1"
            stroke-opacity="1"
            pointer-events="visiblePainted"
            style="cursor: grab"
            @mousedown="startRotate"
            @mouseup="$emit('mouseup', $event, element.id)"
      />
      <path v-for="(p, index) in cornerPaths"
            :key="index"
            :d="p.path"
            :transform="p.getTransform()"
            fill="#1a73e8"
            fill-opacity="1"
            stroke="#32a852"
            stroke-width="1"
            stroke-opacity="1"
            pointer-events="visiblePainted"
            :style="`cursor: ${p.direction}-resize`"
            @mousedown="startResize($event, p.canonicalDirection)"
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
import Vector from '@/creator/matrix/Vector';

@Component
export default class RectElementEditingComponent extends Vue {
  @Prop(RectElement) element!: RectElement;

  @Prop(Point) dragOffset!: Point;

  @Prop(Point) dragPosition!: Point;

  @Prop(Point) resizePosition!: Point;

  @Prop(Point) rotatePosition!: Point;

  dragOffsetX = 0;

  dragOffsetY = 0;

  resizeDirection = '';

  maxResizeTranslation!: Point;

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
    ].map((p) => new Resizer(p.direction, this.element.transform, p.point));
  }

  get rotatePath(): Resizer {
    return new Resizer(
      'r',
      this.element.transform,
      this.element.getRotatePoint(),
    );
  }

  @Watch('dragOffset')
  onDragOffsetChange(val: Point) {
    this.dragOffsetX = val.x - this.element.transform.getTranslateX();
    this.dragOffsetY = val.y - this.element.transform.getTranslateY();
  }

  @Watch('dragPosition')
  onDragPositionChange(val: Point) {
    const rotation = this.element.transform.getRotationDegree();
    this.element.transform.rotate(-rotation);
    const deltaX = this.element.transform.getTranslateX() - (val.x - this.dragOffsetX);
    const deltaY = this.element.transform.getTranslateY() - (val.y - this.dragOffsetY);
    this.element.transform.translate(-deltaX, -deltaY);
    this.element.transform.rotate(rotation);
    this.$emit('update', this.element);
  }

  startResize(event: MouseEvent, direction: string) {
    this.resizeDirection = direction;
    this.maxResizeTranslation = new Point({ x: this.element.width, y: this.element.height });
    this.resizeOffsetX = event.offsetX;
    this.resizeOffsetY = event.offsetY;
    this.$emit('resize', event);
  }

  min_width = 10;

  min_height = 10;

  @Watch('resizePosition')
  onResizePositionChange(val: Point): void {
    const invert = this.element.transform.getInvertedMatrix();
    if (!invert) {
      return;
    }
    const resizePoint = invert.multiplyVector(new Vector([
      val.x,
      val.y,
      1,
    ]));

    let deltaX;
    let deltaY;

    switch (this.resizeDirection) {
      case ('n'):
        deltaY = -resizePoint.get(1);
        if (this.element.height + deltaY < this.min_height) {
          deltaY = -this.element.height + this.min_height;
        }
        this.element.transform.translate(0, -deltaY);
        this.element.height += deltaY;
        break;

      case ('ne'):
        deltaX = this.element.width - resizePoint.get(0);
        deltaY = -resizePoint.get(1);
        if (this.element.height + deltaY < this.min_height) {
          deltaY = -this.element.height + this.min_height;
        }
        if (this.element.width - deltaX < this.min_width) {
          deltaX = this.element.width - this.min_width;
        }
        this.element.transform.translate(0, -deltaY);
        this.element.height += deltaY;
        this.element.width -= deltaX;
        break;

      case ('e'):
        deltaX = this.element.width - resizePoint.get(0);
        if (this.element.width - deltaX < this.min_width) {
          deltaX = this.element.width - this.min_width;
        }
        this.element.width -= deltaX;
        break;

      case ('se'):
        deltaX = this.element.width - resizePoint.get(0);
        deltaY = this.element.height - resizePoint.get(1);
        if (this.element.width - deltaX < this.min_width) {
          deltaX = this.element.width - this.min_width;
        }
        if (this.element.height - deltaY < this.min_height) {
          deltaY = this.element.height - this.min_height;
        }
        this.element.height -= deltaY;
        this.element.width -= deltaX;
        break;

      case ('s'):
        deltaY = this.element.height - resizePoint.get(1);
        if (this.element.height - deltaY < this.min_height) {
          deltaY = this.element.height - this.min_height;
        }
        this.element.height -= deltaY;
        break;

      case ('sw'):
        deltaX = -resizePoint.get(0);
        deltaY = this.element.height - resizePoint.get(1);
        if (this.element.height - deltaY < this.min_height) {
          deltaY = this.element.height - this.min_height;
        }
        if (this.element.width + deltaX < this.min_width) {
          deltaX = -this.element.width + this.min_width;
        }
        this.element.transform.translate(-deltaX, 0);
        this.element.width += deltaX;
        this.element.height -= deltaY;
        break;

      case ('w'):
        deltaX = -resizePoint.get(0);
        if (this.element.width + deltaX < this.min_width) {
          deltaX = -this.element.width + this.min_width;
        }
        this.element.transform.translate(-deltaX, 0);
        this.element.width += deltaX;
        break;

      case ('nw'):
      default:
        deltaX = -resizePoint.get(0);
        deltaY = -resizePoint.get(1);
        if (this.element.width + deltaX < this.min_width) {
          deltaX = -this.element.width + this.min_width;
        }
        if (this.element.height + deltaY < this.min_height) {
          deltaY = -this.element.height + this.min_height;
        }
        this.element.transform.translate(-deltaX, -deltaY);
        this.element.width += deltaX;
        this.element.height += deltaY;
    }

    this.resizeOffsetX = val.x;
    this.resizeOffsetY = val.y;
    this.$emit('update', this.element);
  }

  startRotate() {
    this.$emit('rotate');
  }

  rotateCenter(degree: number): void {
    this.element.transform.translate(this.element.width / 2, this.element.height / 2);
    this.element.transform.rotate(degree);
    this.element.transform.translate(-this.element.width / 2, -this.element.height / 2);
  }

  @Watch('rotatePosition')
  onRotatePositionChange(val: Point): void {
    const center = this.element.getCenterPoint();
    const x = Math.atan2(
      val.y - center.y,
      val.x - center.x,
    ) * (180 / Math.PI);

    const newAngle = (x + 450) % 360;

    this.rotateCenter(-this.element.transform.getRotationDegree() + newAngle);
    this.$emit('update', this.element);
  }
}
</script>
