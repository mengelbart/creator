<template>
  <g>
    <g>
      <line :x2="element.width"
            :y2="element.height"
            :transform="element.transform.string"
            :stroke="element.stroke"
            @click="$emit('click', $event, element.id)"
            @mousedown="$emit('mousedown', $event, element.id)"
            @mouseup="$emit('mouseup', $event, element.id)"
      />
    </g>
    <g>
      <line :x2="element.width"
            :y2="element.height"
            :transform="element.transform.string"
            :stroke="element.stroke"
            stroke-width="10"
            stroke-opacity="0"
            @click="$emit('click', $event, element.id)"
            @mousedown="$emit('mousedown', $event, element.id)"
            @mouseup="$emit('mouseup', $event, element.id)"
      />
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LineElement from '@/creator/LineElement';

@Component
export default class LineElementComponent extends Vue {
  @Prop(LineElement) element!: LineElement;
}
</script>

<style scoped>

</style>
