<template>
  <g>
    <rect :width="element.width"
          :height="element.height"
          :transform="element.transform.string"
          :stroke="element.stroke"
          :fill="element.fill"
          :fill-opacity="element.fillOpacity"
          @click="$emit('click', $event, element.id)"
          @mousedown="$emit('mousedown', $event, element.id)"
          @mouseup="$emit('mouseup', $event, element.id)"
    />
  </g>
</template>

<script lang="ts">
import RectElement from '@/creator/RectElement';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RectElementComponent extends Vue {
  @Prop(RectElement) element!: RectElement;
}
</script>
