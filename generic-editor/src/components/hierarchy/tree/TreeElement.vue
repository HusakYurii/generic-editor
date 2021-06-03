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

import { TreeProps, TreeData, TreeComputed, TreeMethods } from "./TreeElement";

import NodeElement from "./NodeElement.vue";
import { NodeModel, NodePublicInstance } from "./NodeElement";
import {
  appendModel,
  findElement,
  getPositionInTheBox,
  isChild,
  isSameNode,
  removeModel,
} from "./treeUtils";

let isClicked = false;
let mouseButtons: number[] = [];
let grabbedData: {
  currentNode: NodePublicInstance | null;
  newParentNode: NodePublicInstance | null;
} = {
  currentNode: null,
  newParentNode: null,
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
          name: "Default",
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
      return true;
    },
  },
  methods: {
    /* Sometimes when Vue rerenders the elements, an el can be null
     */
    updateNode(el: NodePublicInstance): void {
      if (el) {
        this.treeNodes.push(el);
      }
    },
    onMouseDown(event: MouseEvent) {
      event.preventDefault();
      // assume the 0 is always mouse's left button
      if (event.button !== 0) {
        return;
      }
      mouseButtons.push(event.button);
      isClicked = true;

      const { bounds, node } = findElement(
        event.clientX,
        event.clientY,
        this.treeNodes
      );

      if (!node || node.id === this.treeModel.id) {
        return;
      }

      grabbedData.currentNode = node;

      console.log(
        `onMouseDown: node is${grabbedData.currentNode ? "" : " NOT"} found`
      );
    },
    onMouseMove(event: MouseEvent): void {
      event.preventDefault();

      if (!isClicked || !grabbedData.currentNode) {
        return;
      }

      const { node, bounds } = findElement(
        event.clientX,
        event.clientY,
        this.treeNodes
      );

      let isValid = true;
      if (!node) {
        isValid = false;
      } else if (isSameNode(grabbedData.currentNode, node)) {
        isValid = false;
      } else if (isChild(grabbedData.currentNode, node)) {
        isValid = false;
      }

      if (!isValid) {
        grabbedData.newParentNode?.removeBorders();
        grabbedData.currentNode?.removeBorders();
        grabbedData.newParentNode = null;
        return;
      }

      const borderType = getPositionInTheBox(
        event.clientX,
        event.clientY,
        bounds
      );

      if (grabbedData.newParentNode !== node) {
        grabbedData.newParentNode?.removeBorders();
        grabbedData.newParentNode = node;
      } else {
        node?.removeBorders();
      }

      if (borderType) {
        node?.showBorder(borderType);
      }
      console.log(`onMouseMove: hover on top of ${node?.copyModel().name}`);
    },
    onMouseUp(event: MouseEvent) {
      event.preventDefault();

      if (!mouseButtons.includes(event.button)) {
        return;
      }
      mouseButtons.length = 0;
      isClicked = false;

      if (!grabbedData.newParentNode || !grabbedData.currentNode) {
        grabbedData.currentNode = null;
        grabbedData.newParentNode = null;
        return;
      }

      grabbedData.currentNode.removeBorders();
      grabbedData.newParentNode.removeBorders();

      const nodeModel = grabbedData.currentNode.copyModel();
      const targetID = grabbedData.newParentNode.id;

      if (removeModel(this.treeModel, nodeModel.id)) {
        console.log(`onMouseUp: child ${nodeModel.name} was removed`);
      }
      if (appendModel(this.treeModel, targetID, nodeModel)) {
        console.log(`onMouseUp: child was added to new parent`);
      }

      grabbedData.currentNode = null;
      grabbedData.newParentNode = null;
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
