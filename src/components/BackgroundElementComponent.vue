<template>
  <g>
    <path :fill="element.fill"
          :d="element.d"
          @click="$emit('click', $event, element.id)"
    ></path>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BackgroundElement from '@/creator/BackgroundElement';
import { Prop } from 'vue-property-decorator';

@Component
export default class BackgroundElementComponent extends Vue {
  @Prop(BackgroundElement) element!: BackgroundElement;
}
</script>

<style scoped>

</style>
