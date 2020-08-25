<template>
  <div>
    <div id="workspace-container">
      <div id="canvas"></div>
      <div id="page">
        <svg baseProfile="full"
             style="position: absolute; top: 13px; left: 13px;"
             :width="width" :height="height"
             xmlns="http://www.w3.org/2000/svg">
        <component v-for="e in elements" :is="e.component" :element="e" :key="e.id"></component>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Element from '@/creator/Element';
import BackgroundElement from '@/creator/BackgroundElement';
import BackgroundElementComponent from '@/components/BackgroundElementComponent.vue';
import AffineTransform from '@/creator/AffineTransform';
import LineElement from '@/creator/LineElement';
import LineElementComponent from '@/components/LineElementComponent.vue';

@Component({
  components: {
    BackgroundElementComponent,
    LineElementComponent,
  },
})
export default class Creator extends Vue {
  width = 500;

  height = 500;

  elements: Element[] = [
    new BackgroundElement(
      'id',
      0,
      0,
      this.width,
      this.height,
      new AffineTransform(0, 0, 0, 0, 0, 0),
      '#000',
    ),
    new LineElement(
      'lineId',
      200,
      200,
      new AffineTransform(1, 0, 0, 1, 100, 200),
      'white',
    ),
  ];
}
</script>
