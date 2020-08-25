<template>
  <g>
    <path :fill="element.fill" :d="element.d"></path>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import BackgroundElement from '@/creator/BackgroundElement';
import { Prop } from 'vue-property-decorator';

@Component
export default class BackgroundElementComponent extends Vue {
  @Prop(BackgroundElement) element: BackgroundElement | undefined;
}
</script>

<style scoped>

</style>
