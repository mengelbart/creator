<template>
  <g>
    <g>
      <path :d="path"
            :transform="transform"
            :fill-opacity="0"
      />
    </g>
    <g>
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

  get width(): number {
    return this.element.width || 0;
  }

  get height(): number {
    return this.element.height || 0;
  }

  get transform(): string {
    return this.element.transform.string || '';
  }
}
</script>
