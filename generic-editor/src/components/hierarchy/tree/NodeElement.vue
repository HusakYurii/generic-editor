<template>
  <div class="node">
    <div @click="toggle" class="node-toggler">
      <span
        class="node-toggler-marker"
        :class="{ hidden: !isFolder, clicked: isOpen }"
        >&#10148;
      </span>
      <span class="node-name">
        {{ item.name }}
      </span>
      <span class="node-visibility" :class="{ isVisible: isVisible }">
        &#128065;
      </span>
    </div>
    <div v-show="isOpen" v-if="isFolder">
      <NodeElement
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface INode {
  id: number;
  name: string;
  isVisible: boolean;
  children: INode[];
}
export default defineComponent({
  name: "NodeElement",
  props: {
    item: {
      require: true,
      type: Object as PropType<INode>,
      default: () => ({
        id: -1,
        name: "",
        isVisible: true,
        children: [],
      }),
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder(): boolean {
      if (this.item === undefined) {
        return false;
      }
      return this.item.children && this.item.children.length !== 0;
    },
    isVisible(): boolean {
      return this.item.isVisible;
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
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
  background-color: #2c393c;
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
