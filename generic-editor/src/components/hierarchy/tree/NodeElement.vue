<template>
  <div class="node">
    <div @click="toggle" class="node-toggler">
      <span class="node-toggler-name">{{ item.name }}</span>
      <span v-if="isFolder" class="node-toggler-marker">
        [{{ isOpen ? "-" : "+" }}]
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
  name: string;
  children: INode[];
}
export default defineComponent({
  name: "NodeElement",
  props: {
    item: {
      require: true,
      type: Object as PropType<INode>,
      default: () => ({
        name: "",
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
  justify-content: space-between;

  cursor: pointer;

  padding: 5px 0 5px 15px;

  background-color: inherit;
  transition: 0.3s;
}

.node-toggler-marker,
.node-toggler-name {
  font-size: 2em;
  color: #b1b8ba;
}

.node-toggler-marker {
  margin-right: 5px;
}

.node-toggler:hover {
  background-color: #2c393c;
}
.node-toggler:hover > .node-toggler-marker {
  color: #ffffff;
}
.node-toggler:hover > .node-toggler-name {
  color: #ffffff;
}
</style>
