<template>
  <div id="tree">
    <NodeElement :item="treeData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NodeElement from "./NodeElement.vue";

export default defineComponent({
  name: "TreeElement",
  components: {
    NodeElement,
  },
  data() {
    return {
      treeData: {
        name: "Root",
        children: [
          { name: "child-1", children: [] },
          { name: "child-2", children: [] },
          {
            name: "child-3",
            children: [
              {
                name: "child-3.1",
                children: [
                  { name: "child-3.1.1", children: [] },
                  { name: "child-3.1.2", children: [] },
                ],
              },
              { name: "child-3.2", children: [] },
              { name: "child-3.3", children: [] },
              {
                name: "child-3.4",
                children: [
                  { name: "child-3.4.1", children: [] },
                  { name: "child-3.4.2", children: [] },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {},
});
</script>

<style scoped>
#tree {
}
</style>
