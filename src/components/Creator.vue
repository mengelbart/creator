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
          <component v-if="editingElement"
                     :is="editingElement.editingComponent"
                     :element="editingElement"
                     :dragOffset="dragOffset"
                     :dragPosition="dragPosition"
                     :resizePosition="resizePosition"
                     @mousedown="onElementDrag"
                     @mouseup="onElementDrop"
                     @resize="onElementResizeStart"
                     @update="updateElement"
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
import Point from '@/creator/Point';

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

  editingElement: AbstractElement | null = null;

  dragOffset: Point = new Point({});

  dragPosition: Point = new Point({});

  resizePosition: Point = new Point({});

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
      transform: new AffineTransform(
        Math.sqrt(2) / 2,
        -Math.sqrt(2) / 2,
        158,
        Math.sqrt(2) / 2,
        Math.sqrt(2) / 2,
        300,
      ),
      stroke: 'black',
    }),
    new RectElement({
      id: 'rectId2',
      width: 200,
      height: 200,
      transform: new AffineTransform(0.5, 0, 0, 0.5, 0, 0),
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
      this.editingElement = this.elements.find((e) => e.id === elementId) || null;
    } else {
      this.editingElement = null;
    }
  }

  waitForFirstDragMove = false;

  onElementDrag({ offsetX, offsetY }: MouseEvent, elementId: string): void {
    this.editingElement = this.elements.find((e) => e.id === elementId) || null;
    this.svg.addEventListener('mousemove', this.onMouseMove);
    this.waitForFirstDragMove = true;
  }

  onElementDrop(): void {
    this.svg.removeEventListener('mousemove', this.onMouseMove);
    this.onElementResizeStop();
  }

  onMouseMove({ offsetX, offsetY }: MouseEvent): void {
    if (this.waitForFirstDragMove) {
      // If this is the first move, update the drag offset, to prevent jumping to top left X,Y
      this.dragOffset = new Point({ x: offsetX, y: offsetY });
      this.waitForFirstDragMove = false;
    }
    this.dragPosition = new Point({ x: offsetX, y: offsetY });
  }

  onElementResizeStart({ offsetX, offsetY }: MouseEvent): void {
    this.resizePosition = new Point({ x: offsetX, y: offsetY });
    this.svg.addEventListener('mousemove', this.onMouseResize);
  }

  onElementResizeStop(): void {
    this.svg.removeEventListener('mousemove', this.onMouseResize);
  }

  onMouseResize({ offsetX, offsetY }: MouseEvent): void {
    this.resizePosition = new Point({ x: offsetX, y: offsetY });
  }

  updateElement(element: AbstractElement) {
    const index = this.elements.findIndex((e) => e.id === element.id);
    if (index !== -1) {
      this.elements[index] = element;
    }
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
