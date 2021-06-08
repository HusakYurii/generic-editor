<template>
  <div class="node">
    <div class="node-toggler">
      <div v-if="isFolder" @click.stop="toggle" class="node-toggler-marker">
        {{ isOpen ? " &#x2212;" : "&#x2b;" }}
      </div>

      <div class="node-name">
        {{ nodeModel.name }}
      </div>
      <div class="node-visibility-marker" :class="{ isVisible: isVisible }">
        &#128065;
      </div>
    </div>
    <div v-show="isOpen">
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
  BorderTypes,
  Bounds,
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
      borderClassesMap: {
        [BorderTypes.Top]: "borderTop",
        [BorderTypes.Center]: "borderCenter",
      },
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
    /* Sometimes when Vue rerenders the elements, an el can be null
     */
    updateNode(el: NodePublicInstance): void {
      if (el) {
        this.treeNodes.push(el);
      }
    },
    getBounds(): Bounds {
      return this.toggler.getBoundingClientRect();
    },
    showBorder(side: BorderTypes): void {
      this.toggler.classList.toggle(this.borderClassesMap[side]);
    },
    removeBorders(): void {
      Object.values(this.borderClassesMap).forEach((className) => {
        if (this.toggler.classList.contains(className)) {
          this.toggler.classList.toggle(className);
        }
      });
    },
  },
});
</script>

<style scoped>
.node {
  margin-left: 25px;
}

.node-toggler {
  position: relative;
  text-align: left;
  padding: 3px 0 3px 8px;
  border: 2px solid transparent;
  transition: color 0.3s, background-color 0.3s;
}

.node-toggler:hover {
  background-color: #1f2729;
}

.node-toggler:hover > .node-name {
  color: #ffffff;
}

.node-toggler.borderTop {
  border-top: 2px solid #f60;
}

.node-toggler.borderCenter {
  border: 2px solid #f60;
}

/* - IF NODE IS A FOLDER, IT HAS A TOGGLER MARKER, LIKE  " + " or  " - " ----- */
.node-toggler-marker {
  cursor: pointer;
  position: absolute;
  left: -24px;
  font-size: 25px;
  color: #ffffff;
  background-color: #2c393c;
  width: 16px;
  height: 16px;
  line-height: 16px;
}

/* ------------------ */
.node-name {
  position: relative;
  font-size: 15px;
  color: #b1b8ba;
  white-space: nowrap;
}

/* ------------------ */
.node-visibility-marker {
  position: absolute;
  top: 0;
  right: 8px;
  font-size: 16px;
  color: #b1b8ba;
  transition: color 0.5s;
}
.node-visibility-marker.isVisible {
  color: #ffffff;
}
</style>
