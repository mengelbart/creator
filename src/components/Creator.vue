<template>
  <div>
    <div id="workspace-container">
      <div id="canvas"></div>
      <div id="page">
        <svg ref="svg"
             baseProfile="full"
             style="position: absolute; top: 13px; left: 13px;"
             :width="width" :height="height"
             xmlns="http://www.w3.org/2000/svg"
        >
        <component v-for="e in elements"
                   :is="e.component"
                   :element="e"
                   :key="e.id"
                   @click="onElementClick"
                   @mousedown="onElementDrag"
                   @mouseup="onElementDrop"
        ></component>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AbstractElement from '@/creator/AbstractElement';
import BackgroundElement from '@/creator/BackgroundElement';
import BackgroundElementComponent from '@/components/BackgroundElementComponent.vue';
import AffineTransform from '@/creator/AffineTransform';
import LineElement from '@/creator/LineElement';
import LineElementComponent from '@/components/LineElementComponent.vue';
import RectElement from '@/creator/RectElement';
import RectElementComponent from '@/components/RectElementComponent.vue';
import { Ref } from 'vue-property-decorator';

@Component({
  components: {
    BackgroundElementComponent,
    LineElementComponent,
    RectElementComponent,
  },
})
export default class Creator extends Vue {
  @Ref('svg') readonly svg!: HTMLElement;

  width = 500;

  height = 500;

  draggingElement: AbstractElement | undefined;

  dragOffsetX = 0;

  dragOffsetY = 0;

  elements: AbstractElement[] = [
    new BackgroundElement(
      'id',
      0,
      0,
      this.width,
      this.height,
      new AffineTransform(),
      '#000',
    ),
    new LineElement(
      'lineId',
      200,
      200,
      new AffineTransform(),
      'white',
    ),
    new RectElement(
      'rectId1',
      200,
      200,
      new AffineTransform(1, 0, 0, 1, 200, 200),
      'yellow',
    ),
    new RectElement(
      'rectId2',
      200,
      200,
      new AffineTransform(1, 0, 0, 1, 200, 200),
      'yellow',
    ),
    new RectElement(
      'rectId3',
      200,
      200,
      new AffineTransform(1, 0, 0, 1, 200, 200),
      'yellow',
    ),
  ];

  onElementClick(event: Event, elementId: string): void {
    console.log(this.elements.find((e: AbstractElement) => e.id === elementId));
    console.log(event);
  }

  onElementDrag({ offsetX, offsetY }: MouseEvent, elementId: string): void {
    this.svg.addEventListener('mousemove', this.onMouseMove);

    this.draggingElement = this.elements.find((e) => e.id === elementId);
    if (this.draggingElement) {
      this.dragOffsetX = offsetX - this.draggingElement.transform.translateX;
      this.dragOffsetY = offsetY - this.draggingElement.transform.translateY;
    }
  }

  onElementDrop(): void {
    this.svg.removeEventListener('mousemove', this.onMouseMove);

    this.draggingElement = undefined;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
  }

  onMouseMove({ offsetX, offsetY }: MouseEvent): void {
    if (this.draggingElement) {
      // TODO: Use a store action to update transform
      this.draggingElement.transform.translateX = offsetX - this.dragOffsetX;
      this.draggingElement.transform.translateY = offsetY - this.dragOffsetY;
    }
  }
}
</script>
