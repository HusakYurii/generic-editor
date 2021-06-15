<template>
  <div
    id="tree"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <NodeElement :ref="updateNode" :nodeModel="treeModel" :key="treeModel.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { TreeProps, TreeData, TreeComputed, TreeMethods } from "./TreeElement";

import NodeElement from "./NodeElement.vue";
import { BorderTypes, NodeModel, NodePublicInstance } from "./NodeElement";
import {
  appendNode,
  findElement,
  getPositionInTheBox,
  insertBeforeNode,
  isChildNode,
  isNextNode,
  isSameNode,
  removeNode,
} from "./treeUtils";

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
      isClicked: false,
      mouseButtons: [],
      nodes: {
        current: null,
        parent: null,
      },
    };
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
      this.mouseButtons.push(event.button);
      this.isClicked = true;

      const { node } = findElement(
        event.clientX,
        event.clientY,
        this.treeNodes
      );

      // Root node can not be dragged
      if (!node || node.id === this.treeModel.id) {
        return;
      }

      this.nodes.current = node;
    },
    onMouseMove(event: MouseEvent): void {
      event.preventDefault();

      if (!this.isClicked || !this.nodes.current) {
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
      }
      // if mouse is hovering on the same node, the imput makes no sense
      else if (isSameNode(this.nodes.current, node)) {
        isValid = false;
      }
      // parent can not be set to its child
      else if (isChildNode(this.treeModel, this.nodes.current.id, node.id)) {
        isValid = false;
      }
      // there is no sense to set a child to the same parent again
      else if (isChildNode(this.treeModel, node.id, this.nodes.current.id)) {
        isValid = false;
      }

      if (!isValid) {
        this.nodes.parent?.removeBorders();
        this.nodes.current.removeBorders();
        this.nodes.parent = null;
        return;
      }

      this.nodes.parent?.removeBorders();
      this.nodes.parent = node;

      const borderType = getPositionInTheBox(
        event.clientX,
        event.clientY,
        bounds
      );

      // we know that the node exsists by this point, but use ? to remove TS warnings
      const isNext = isNextNode(
        this.treeModel,
        this.nodes.current.id,
        node?.id || -1
      );

      // A node can be inserted between 2 nodes. But to avoid confusions,
      // the node can not be set before next sibling node. There is no sense to to it
      if (isNext && borderType === BorderTypes.Top) {
        this.nodes.parent = null;
        return;
      }

      // we know that the node exsists by this point, but use ? to remove TS warnings
      if (borderType) {
        node?.showBorder(borderType);
      }
    },
    onMouseUp(event: MouseEvent) {
      event.preventDefault();

      if (!this.mouseButtons.includes(event.button)) {
        return;
      }
      this.mouseButtons.length = 0;
      this.isClicked = false;

      if (!this.nodes.parent || !this.nodes.current) {
        this.nodes.current = null;
        this.nodes.parent = null;
        return;
      }

      const borderType = getPositionInTheBox(
        event.clientX,
        event.clientY,
        this.nodes.parent.getBounds()
      );

      this.nodes.current.removeBorders();
      this.nodes.parent.removeBorders();

      const nodeModel = removeNode(this.treeModel, this.nodes.current.id);
      const targetID = this.nodes.parent.id;

      if (!nodeModel) {
        console.warn(
          `Faild to remove node model from the tree for ID${this.nodes.current.id}`
        );
      } else if (borderType === BorderTypes.Top) {
        insertBeforeNode(this.treeModel, targetID, nodeModel);
      } else if (borderType === BorderTypes.Center) {
        appendNode(this.treeModel, targetID, nodeModel);
      }

      this.nodes.current = null;
      this.nodes.parent = null;
    },
    onMouseLeave(event: MouseEvent): void {
      event.preventDefault();
      this.isClicked = false;
      this.mouseButtons.length = 0;

      this.nodes.current?.removeBorders();
      this.nodes.parent?.removeBorders();

      this.nodes.current = null;
      this.nodes.parent = null;
    },
  },
});
</script>

<style scoped>
#tree {
  margin-left: 10px;
  cursor: default;
}
</style>
