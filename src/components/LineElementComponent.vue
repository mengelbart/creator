<template>
  <g>
    <line :x2="x2"
          :y2="y2"
          :transform="element.transform.string"
          :stroke="element.stroke"
          @click="onClick()"
    />
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import LineElement from '@/creator/LineElement';

@Component
export default class LineElementComponent extends Vue {
  @Prop(LineElement) element: LineElement | undefined;

  get x2(): number {
    if (this.element) {
      return this.element.width;
    }
    return 0;
  }

  get y2(): number {
    if (this.element) {
      return this.element.height;
    }
    return 0;
  }

  onClick(): void {
    console.log(`${this.element} clicked`);
  }
}
</script>

<style scoped>

</style>
