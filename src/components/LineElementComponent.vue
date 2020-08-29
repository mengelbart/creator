<template>
  <g>
    <line :x2="element.width"
          :y2="element.height"
          :transform="element.transform.string"
          :stroke="element.stroke"
          @click="onClick()"
    />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LineElement from '@/creator/LineElement';

@Component
export default class LineElementComponent extends Vue {
  @Prop(LineElement) element: LineElement | undefined;

  onClick(): void {
    console.log(`${this.element} clicked`);
  }
}
</script>

<style scoped>

</style>
