<template>
  <div>
    <div id="workspace-container">
      <div id="canvas"></div>
      <div id="page">
        <svg version="1.1"
             baseProfile="full"
             style="position: absolute; top: 13px; left: 13px;"
             :width="width" :height="height"
             xmlns="http://www.w3.org/2000/svg">
          <template v-for="e in elements">
            <component :is="e.component()" :element="e" :key="e.id()"></component>
          </template>
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

@Component({
  components: {
    BackgroundElementComponent,
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
      '#000',
    ),
  ];
}
</script>
