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
            :d="p"
            fill="#1a73e8"
            fill-opacity="1"
            stroke="#32a852"
            stroke-width="1"
            stroke-opacity="1"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RectElement from '@/creator/RectElement';

@Component
export default class RectElementEditingComponent extends Vue {
  @Prop(RectElement) element!: RectElement;

  stroke = '';

  get path(): string {
    return `M 0 0 L ${this.element.width || 0} 0 ${this.element.width || 0} ${this.element.height || 0} 0 ${this.element.height} Z`;
  }

  get cornerPaths(): string[] {
    return [
      { x: this.element.width / 2, y: 0 },
      { x: this.element.width, y: 0 },
      { x: this.element.width, y: this.element.height / 2 },
      { x: this.element.width, y: this.element.height },
      { x: this.element.width / 2, y: this.element.height },
      { x: 0, y: this.element.height },
      { x: 0, y: this.element.height / 2 },
      { x: 0, y: 0 },
    ].map((p) => {
      const pp = this.element.transform.applyToPoint(p);
      return `M ${pp.x - 4} ${pp.y - 4} L ${pp.x + 4} ${pp.y - 4} ${pp.x + 4} ${pp.y + 4} ${pp.x - 4} ${pp.y + 4} Z`;
    });
  }
}
</script>
