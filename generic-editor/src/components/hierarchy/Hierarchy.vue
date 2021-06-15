<template>
  <div id="hierarchy">
    <div id="hierarchy-header">
      <h3>HIERARCHY</h3>
    </div>
    <div id="hierarchy-tree">
      <TreeElement :treeModel="treeModel" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  HierarchyComputed,
  HierarchyData,
  HierarchyMethods,
  HierarchyProps,
} from "./Hierarchy";
import { NodeModel } from "./tree/NodeElement";
import TreeElement from "./tree/TreeElement.vue";

export default defineComponent<
  HierarchyProps,
  unknown,
  HierarchyData,
  HierarchyComputed,
  HierarchyMethods
>({
  name: "Hierarchy",
  components: {
    TreeElement,
  },
  props: {
    treeModel: {
      require: true,
      type: Object as PropType<NodeModel>,
      default(): NodeModel {
        return {
          id: 0,
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
      message: "",
    };
  },
  computed: {
    // dummy method was added to avoid ts errors about empty HierarchyComputed type
    isHierarchy(): boolean {
      return true;
    },
  },
  methods: {
    onContextmenu(event: Event) {
      event.preventDefault();
    },
  },
  mounted() {
    const hierarchyContaienr = this.$el as HTMLElement;
    // I can use this.onContextmenu becayse the context will not be lost.
    // Vue binded allmethods before
    hierarchyContaienr.addEventListener("contextmenu", this.onContextmenu);
  },
});
</script>

<style>
#hierarchy {
  width: 100%;
  height: 100%;
}
#hierarchy-header > h3 {
  color: #ffffff;
  font-size: 2.5em;
  margin: 5px 0;
}
#hierarchy-tree {
  margin: 20px 0 0 0;
}
</style>
