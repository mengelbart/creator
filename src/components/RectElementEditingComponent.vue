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
            fill="#1a73e8"
            fill-opacity="1"
            stroke="#32a852"
            stroke-width="1"
            stroke-opacity="1"
            pointer-events="visiblePainted"
            :style="`cursor: ${p.direction}-resize`"
            @click="$emit('click', $event, element.id)"
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
import Point from '@/creator/Point';

@Component
export default class RectElementEditingComponent extends Vue {
  @Prop(RectElement) element!: RectElement;

  stroke = '';

  get path(): string {
    return `M 0 0 L ${this.element.width || 0} 0 ${this.element.width || 0} ${this.element.height || 0} 0 ${this.element.height} Z`;
  }

  get cornerPaths(): Resizer[] {
    return [
      { direction: 'n', x: this.element.width / 2, y: 0 },
      { direction: 'ne', x: this.element.width, y: 0 },
      { direction: 'e', x: this.element.width, y: this.element.height / 2 },
      { direction: 'se', x: this.element.width, y: this.element.height },
      { direction: 's', x: this.element.width / 2, y: this.element.height },
      { direction: 'sw', x: 0, y: this.element.height },
      { direction: 'w', x: 0, y: this.element.height / 2 },
      { direction: 'nw', x: 0, y: 0 },
    ].map((p) => {
      const pp = this.element.transform.applyToPoint(p);
      return new Resizer(p.direction, 0, new Point(pp));
    });
  }
}
</script>
