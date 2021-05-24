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
        id: 0,
        name: "Root",
        isVisible: true,
        children: [
          { id: 1, name: "child-1", isVisible: true, children: [] },
          { id: 1, name: "child-2", isVisible: true, children: [] },
          {
            id: 1,
            name: "child-3",
            isVisible: true,
            children: [
              {
                id: 1,
                name: "child-3.1",
                isVisible: true,
                children: [
                  { id: 1, name: "child-3.1.1", isVisible: true, children: [] },
                  { id: 1, name: "child-3.1.2", isVisible: true, children: [] },
                ],
              },
              { id: 1, name: "child-3.2", isVisible: true, children: [] },
              { id: 1, name: "child-3.3", isVisible: true, children: [] },
              {
                id: 1,
                name: "child-3.4",
                isVisible: true,
                children: [
                  { id: 1, name: "child-3.4.1", isVisible: true, children: [] },
                  { id: 1, name: "child-3.4.2", isVisible: true, children: [] },
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
