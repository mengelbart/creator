<template>
  <div>
    <div id="workspace-container" :style="style">
      <div id="canvas"
      ></div>
      <div id="page">
        <svg ref="svg"
             baseProfile="full"
             :width="width * zoom" :height="height * zoom"
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
      <div>
        <svg id="editor"
             ref="editingSVG"
             baseProfile="full"
             :width="width * zoom" :height="height * zoom"
             xmlns="http://www.w3.org/2000/svg"
             pointer-events="none"
        >
          <component v-if="isEditingElement"
                     :is="editingElement.editingComponent"
                     :element="editingElement"
                     @click="onElementClick"
                     @mousedown="onElementResizeStart"
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
import RectElementEditingComponent from '@/components/RectElementEditingComponent.vue';
import LineElementEditingComponent from '@/components/LineElementEditingComponent.vue';
import BackgroundElementEditingComponent from '@/components/BackgroundElementEditingComponent.vue';

@Component({
  components: {
    BackgroundElementComponent,
    BackgroundElementEditingComponent,
    LineElementComponent,
    LineElementEditingComponent,
    RectElementComponent,
    RectElementEditingComponent,
  },
})
export default class Creator extends Vue {
  @Ref('svg') readonly svg!: HTMLElement;

  @Ref('editingSVG') readonly editor!: HTMLElement;

  zoom = 1;

  width = 2570;

  height = 3742;

  draggingElement: AbstractElement | null = null;

  dragOffsetX = 0;

  dragOffsetY = 0;

  isEditingElement = false;

  editingElement: AbstractElement | null = null;

  resizeDirection = '';

  resizeOffsetX = 0;

  resizeOffsetY = 0;

  elements: AbstractElement[] = [
    new BackgroundElement({
      id: 'background',
      width: this.width,
      height: this.height,
      transform: new AffineTransform(),
      fill: '#fff',
    }),
    new LineElement({
      id: 'lineId',
      width: 200,
      height: 200,
      transform: new AffineTransform(),
      stroke: 'red',
    }),
    new RectElement({
      id: 'rectId1',
      width: 200,
      height: 200,
      transform: new AffineTransform(1, 0, 200, 1, 0, 200),
      stroke: 'black',
    }),
    new RectElement({
      id: 'rectId2',
      width: 200,
      height: 200,
      transform: new AffineTransform(1, 0, 200, 1, 0, 200),
      stroke: 'blue',
    }),
    new RectElement({
      id: 'rectId3',
      width: 200,
      height: 200,
      transform: new AffineTransform(1, 0, 200, 1, 0, 200),
      stroke: 'green',
      fill: '',
      fillOpacity: 0,
    }),
  ];

  get style(): string {
    return `position: relative; margin: 20px; width: ${this.width * this.zoom}px; height: ${this.height * this.zoom}px;`;
  }

  onElementClick(event: Event, elementId: string): void {
    if (elementId !== 'background') {
      this.isEditingElement = true;
      this.editingElement = this.elements.find((e) => e.id === elementId) || null;
    } else {
      this.isEditingElement = false;
      this.editingElement = null;
    }
  }

  onElementDrag({ offsetX, offsetY }: MouseEvent, elementId: string): void {
    this.svg.addEventListener('mousemove', this.onMouseMove);

    this.draggingElement = this.elements.find((e) => e.id === elementId) || null;
    if (this.draggingElement) {
      this.dragOffsetX = offsetX - this.draggingElement.transform.translateX;
      this.dragOffsetY = offsetY - this.draggingElement.transform.translateY;
    }
  }

  onElementDrop(): void {
    this.svg.removeEventListener('mousemove', this.onMouseMove);
    this.draggingElement = null;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.onElementResizeStop();
  }

  onMouseMove({ offsetX, offsetY }: MouseEvent): void {
    if (this.draggingElement) {
      // TODO: Use a store action to update transform
      this.draggingElement.transform.translateX = offsetX - this.dragOffsetX;
      this.draggingElement.transform.translateY = offsetY - this.dragOffsetY;
    }
  }

  onElementResizeStart(
    { offsetX, offsetY }: MouseEvent,
    direction: string, elementId: string,
  ): void {
    this.svg.addEventListener('mousemove', this.onMouseResize);
    this.resizeDirection = direction;
    this.isEditingElement = true;
    this.editingElement = this.elements.find((e) => e.id === elementId) || null;
    if (this.editingElement) {
      this.resizeOffsetX = offsetX;
      this.resizeOffsetY = offsetY;
    }
  }

  onElementResizeStop(): void {
    this.svg.removeEventListener('mousemove', this.onMouseResize);
    this.resizeDirection = '';
    this.resizeOffsetX = 0;
    this.resizeOffsetY = 0;
  }

  onMouseResize({ offsetX, offsetY }: MouseEvent): void {
    if (!this.editingElement) {
      return;
    }

    const deltaX = this.resizeOffsetX - offsetX;
    const deltaY = this.resizeOffsetY - offsetY;

    switch (this.resizeDirection) {
      case ('n'):
        this.editingElement.transform.translateY -= deltaY;
        this.editingElement.height += deltaY;
        break;

      case ('ne'):
        this.editingElement.transform.translateY -= deltaY;
        this.editingElement.height += deltaY;
        this.editingElement.width -= deltaX;
        break;

      case ('e'):
        this.editingElement.width -= deltaX;
        break;

      case ('se'):
        this.editingElement.height -= deltaY;
        this.editingElement.width -= deltaX;
        break;

      case ('s'):
        this.editingElement.height -= deltaY;
        break;

      case ('sw'):
        this.editingElement.transform.translateX -= deltaX;
        this.editingElement.width += deltaX;
        this.editingElement.height -= deltaY;
        break;

      case ('w'):
        this.editingElement.transform.translateX -= deltaX;
        this.editingElement.width += deltaX;
        break;

      case ('nw'):
      default:
        this.editingElement.transform.translateX -= deltaX;
        this.editingElement.width += deltaX;
        this.editingElement.transform.translateY -= deltaY;
        this.editingElement.height += deltaY;
    }

    this.resizeOffsetX = offsetX;
    this.resizeOffsetY = offsetY;
  }
}
</script>

<style>
#canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #ccc;
}

#page{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1px;
}

#editor{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1px;
}
</style>
