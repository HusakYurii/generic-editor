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
import { defineComponent } from "vue";
import { treeModelMock } from "./tree/TreeModelMock";
import TreeElement from "./tree/TreeElement.vue";

export default defineComponent({
  name: "Hierarchy",
  components: {
    TreeElement,
  },
  data() {
    return {
      treeModel: treeModelMock,
    };
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
