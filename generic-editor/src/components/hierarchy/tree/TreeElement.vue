<template>
  <div
    id="tree"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <NodeElement :ref="updateNode" :nodeModel="treeModel" :key="treeModel.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import {
  TreeProps,
  TreeData,
  TreeComputed,
  TreeMethods,
  Result,
  Bounds,
} from "./TreeElement";

import NodeElement from "./NodeElement.vue";
import { NodeModel, NodePublicInstance } from "./NodeElement";
import { findElement, getPositionInTheBox } from "./treeUtils";

let isClicked = false;
let mouseButtons: number[] = [];
let drabbedData: Result & { previousNode: NodePublicInstance | null } = {
  node: null,
  previousNode: null,
  bounds: { x: 0, y: 0, width: 0, height: 0 },
};

export default defineComponent<
  TreeProps,
  unknown,
  TreeData,
  TreeComputed,
  TreeMethods
>({
  name: "TreeElement",
  components: {
    NodeElement,
  },
  props: {
    treeModel: {
      require: true,
      type: Object as PropType<NodeModel>,
      default(): NodeModel {
        return {
          id: -1000,
          name: "Root",
          isDraggable: false,
          isVisible: true,
          children: [],
        };
      },
    },
  },
  data() {
    return {
      treeNodes: [],
    };
  },
  mounted() {
    console.dir(this);
  },
  beforeUpdate(): void {
    this.treeNodes = [];
  },
  computed: {
    // dummy method was added to avoid ts errors about empty TreeComputed type
    isRoot(): boolean {
      return this.treeModel.id === -1000 && this.treeModel.name === "Root";
    },
  },
  methods: {
    updateNode(el: NodePublicInstance): void {
      this.treeNodes.push(el);
    },
    onMouseDown(event: MouseEvent) {
      if (mouseButtons.includes(event.button)) {
        return;
      }
      mouseButtons.push(event.button);
      isClicked = true;

      const { bounds, node } = findElement(
        event.clientX,
        event.clientY,
        this.treeNodes
      );

      drabbedData.bounds = bounds;
      drabbedData.node = node;

      console.log(`onMouseDown: node is${drabbedData.node ? "" : "n't"} found`);
    },
    onMouseMove(event: MouseEvent): void {
      if (!isClicked) {
        return;
      }
      event.preventDefault();

      const { node, bounds } = findElement(
        event.clientX,
        event.clientY,
        this.treeNodes
      );

      const borderType = getPositionInTheBox(
        event.clientX,
        event.clientY,
        bounds
      );

      if (drabbedData.previousNode !== node) {
        drabbedData.previousNode?.removeBorders();
        drabbedData.previousNode = node;
      } else {
        node?.removeBorders();
      }

      if (borderType) {
        node?.showBorder(borderType);
      }
    },
    onMouseUp(event: MouseEvent) {
      if (!mouseButtons.includes(event.button)) {
        return;
      }
      mouseButtons.splice(mouseButtons.indexOf(event.button), 1);
      isClicked = false;

      drabbedData.node?.removeBorders();
      drabbedData.previousNode?.removeBorders();

      drabbedData.node = null;
      drabbedData.previousNode = null;
      drabbedData.bounds = { x: 0, y: 0, width: 0, height: 0 };

      console.log(`onMouseMove:Clean up Drabbed Data`);
    },
  },
});
</script>

<style scoped>
#tree {
  padding: 15px 0;
  cursor: pointer;
}
</style>
