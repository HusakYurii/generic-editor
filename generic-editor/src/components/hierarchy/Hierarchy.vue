<template>
  <div id="hierarchy">
    <div id="hierarchy-header">
      <div>
        <h3>HIERARCHY</h3>
      </div>
      <div id="menu-icons">
        <div id="add-node">
          <i class="fa fa-plus"> </i>
          <ul id="nodes-list">
            <li id="type-1">Container</li>
            <li id="type-2">Animated Sprite</li>
            <li id="type-3">Sprite</li>
            <li id="type-4">Spine</li>
            <li id="type-5">Text</li>
          </ul>
        </div>
        <div id="delete-node" :class="{ canDeleteNode: canDeleteNode }">
          <i class="fa fa-trash"></i>
        </div>
      </div>
    </div>
    <div id="hierarchy-tree">
      <TreeElement />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { editorStore, generateID } from "../EditorStore";
import {
  HierarchyComputed,
  HierarchyData,
  HierarchyMethods,
  HierarchyProps,
} from "./Hierarchy";
import TreeElement from "./tree/TreeElement.vue";
import { appendNode, removeNode } from "./tree/treeUtils";

const NodeTypes: Record<string, string> = {
  "type-1": "Container",
  "type-2": "AnimatedSprite",
  "type-3": "Sprite",
  "type-4": "Spine",
  "type-5": "Text",
};
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

  data() {
    return {
      message: "",
      editorStore: editorStore,
    };
  },
  computed: {
    canDeleteNode(): boolean {
      if (!this.editorStore.selectedNode) {
        return false;
      }
      return this.editorStore.selectedNode.name !== "Root";
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
    const deleteButon = this.$el.querySelector("#delete-node") as HTMLElement;
    deleteButon.addEventListener("click", (e) => {
      // basically this.canDeleteNode & this.editorStore.selectedNode have the same meaning
      if (this.canDeleteNode && this.editorStore.selectedNode) {
        removeNode(
          this.editorStore.treeModel,
          this.editorStore.selectedNode.id
        );
        this.editorStore.selectedNode = null;
      }
    });

    const nodeList = this.$el.querySelector("#nodes-list") as HTMLElement;
    for (const child of nodeList.children) {
      child.addEventListener("click", (e) => {
        e.stopPropagation();
        const parentID = this.editorStore.selectedNode
          ? this.editorStore.selectedNode.id
          : 0;

        const childID = generateID();
        appendNode(this.editorStore.treeModel, parentID, {
          id: childID,
          name: `${NodeTypes[child.id]}_${childID}`,
          isVisible: true,
          children: [],
        });
      });
    }
  },
});
</script>

<style>
#hierarchy {
  width: 100%;
  height: 100%;
  position: relative;
}
/* HEADER -------------*/
#hierarchy-header {
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 0px;
  width: 100%;
}
#hierarchy-header h3 {
  color: #ffffff;
  font-size: 2.5em;
}

#menu-icons {
  position: relative;
  text-align: right;
  padding: 2px 5px;
}

#add-node,
#delete-node {
  display: inline-block;
  padding: 5px 10px;
}

#add-node > i {
  color: #ffffff;
  font-size: 2em;
}

#delete-node > i {
  color: #9ba1a3;
  font-size: 2em;
  transition: color 0.3s;
}

#delete-node.canDeleteNode > i {
  color: #ffffff;
}

/* DIFFERENT NODE TYPES TO ADD ---- */
#add-node:hover #nodes-list {
  visibility: visible;
}

#nodes-list {
  position: absolute;
  background-color: #20292b;
  width: 150px;
  left: 200px;
  visibility: hidden;
}

#nodes-list > li {
  color: #ffffff;
  background-color: #20292b;
  font-size: 1.4em;
  text-align: center;
  padding: 2px 5px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
}
#nodes-list > li:hover {
  background-color: #9ba1a3;
}

/* HIERARCHY TREE -------------*/
#hierarchy-tree {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 100px;
  left: 0px;
}
</style>
