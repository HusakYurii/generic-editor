<template>
  <div class="node">
    <div @click="toggle" class="node-toggler">
      <span
        class="node-toggler-marker"
        :class="{ hidden: !isFolder, clicked: isOpen }"
        >&#10148;
      </span>
      <span class="node-name">
        {{ nodeModel.name }}
      </span>
      <span class="node-visibility" :class="{ isVisible: isVisible }">
        &#128065;
      </span>
    </div>
    <div v-show="isOpen" class="node-list">
      <NodeElement
        v-for="data in nodeModel.children"
        :key="data.id"
        :nodeModel="data"
        :ref="updateNode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  NodeProps,
  NodeData,
  NodeComputed,
  NodeMethods,
  NodeModel,
  NodePublicInstance,
} from "./NodeElement";

export default defineComponent<
  NodeProps,
  unknown,
  NodeData,
  NodeComputed,
  NodeMethods
>({
  name: "NodeElement",
  props: {
    nodeModel: {
      require: true,
      type: Object as PropType<NodeModel>,
      default(): NodeModel {
        return {
          id: -1,
          name: "Default",
          isDraggable: true,
          isVisible: true,
          children: [],
        };
      },
    },
  },
  data() {
    return {
      id: -1,
      isOpen: false,
      treeNodes: [],
      toggler: document.createElement("div"),
    };
  },
  mounted(): void {
    this.id = this.nodeModel.id;
    this.toggler = this.$el.querySelector("div.node-toggler") as HTMLElement;
  },
  beforeUpdate(): void {
    this.treeNodes = [];
  },
  computed: {
    isFolder(): boolean {
      if (this.nodeModel === undefined) {
        return false;
      }
      return this.nodeModel.children && this.nodeModel.children.length !== 0;
    },
    isVisible(): boolean {
      return this.nodeModel.isVisible;
    },
  },
  methods: {
    toggle(): void {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    updateNode(el: NodePublicInstance): void {
      this.treeNodes.push(el);
    },
  },
});
</script>

<style scoped>
.node {
  margin-left: 15px;
}

.node-toggler {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  cursor: pointer;

  transition: color 0.3s, background-color 0.3s;
}

.node-toggler:hover {
  background-color: #1f2729;
}

.node-toggler:hover > .node-toggler-marker {
  color: #ffffff;
}

.node-toggler:hover > .node-name {
  color: #ffffff;
}

/* ------------------ */
.node-name {
  padding-left: 10px;
  font-size: 2.2em;
  color: #b1b8ba;
}

/* ------------------ */
.node-toggler-marker {
  font-size: 2em;
  color: #b1b8ba;
  visibility: "visible";

  transform: rotate(0deg);
  transition: transform 0.3s;
}

.node-toggler-marker.clicked {
  transform: rotate(90deg);
}

.node-toggler-marker.hidden {
  visibility: hidden;
}

/* ------------------ */
.node-visibility {
  margin: 0 10px 0 auto;
  font-size: 2.5em;
  color: #b1b8ba;
  transition: color 0.5s;
}
.node-visibility.isVisible {
  color: #ffffff;
}
</style>
