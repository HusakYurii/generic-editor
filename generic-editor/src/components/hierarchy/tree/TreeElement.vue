<template>
  <div id="tree" @mousemove="onMouseMove">
    <NodeElement :ref="updateNode" :nodeModel="treeModel" :key="treeModel.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { TreeProps, TreeData, TreeComputed, TreeMethods } from "./TreeElement";

import NodeElement from "./NodeElement.vue";
import { NodeModel, NodePublicInstance } from "./NodeElement";

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
    onMouseMove(event: MouseEvent): void {
      const id = this.findElement(event.clientX, event.clientY, this.treeNodes);
      console.log(id);
    },
    findElement(x: number, y: number, elements: NodePublicInstance[]): number {
      let foundID = -1;

      for (let i = 0; i < elements.length; i += 1) {
        const bounds = elements[i].toggler.getBoundingClientRect();

        if (
          x > bounds.x &&
          x < bounds.x + bounds.width &&
          y > bounds.y &&
          y < bounds.y + bounds.height
        ) {
          foundID = elements[i].id;
          break;
        }

        if (foundID === -1) {
          foundID = this.findElement(x, y, elements[i].treeNodes);
        }
        if (foundID !== -1) {
          return foundID;
        }
      }
      return foundID;
    },
  },
});
</script>

<style scoped>
#tree {
  padding: 15px 0;
}
</style>
