<template>
  <g>
    <g>
      <path :d="path"
            :transform="this.element.transform.string"
            :fill-opacity="0"
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
            @click="$emit('rotate', $event, element.id)"
            @mousedown="$emit('mousedown', $event, p.direction, element.id)"
            @mouseup="$emit('mouseup', $event, element.id)"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RectElement from '@/creator/RectElement';
import Resizer from '@/creator/Resizer';

@Component
export default class RectElementEditingComponent extends Vue {
  @Prop(RectElement) element!: RectElement;

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
}
</script>
