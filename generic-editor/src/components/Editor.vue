<template>
  <div id="editor">
    <div id="hierarchy-container">
      <Hierarchy />
    </div>

    <div id="canvas-container">
      <Canvas />
    </div>

    <div id="properties-container">
      <Properties />
    </div>

    <div id="resources-container">
      <Resources />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Canvas from "../components/canvas/Canvas.vue";
import Hierarchy from "../components/hierarchy/Hierarchy.vue";
import Resources from "../components/resources/Resources.vue";
import Properties from "../components/properties/Properties.vue";

export default defineComponent({
  name: "Editor",
  components: {
    Canvas,
    Hierarchy,
    Resources,
    Properties,
  },
  data() {
    return {
      message: "",
    };
  },
});
</script>

<style>
#editor {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  /*for debugging purpose*/
  background-color: red;
}
#hierarchy-container,
#canvas-container,
#properties-container,
#resources-container {
  position: absolute;
}
#hierarchy-container {
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  background-color: #364346;
}
#canvas-container {
  top: 0;
  right: 300px;
  bottom: 300px;
  left: 300px;
  background-color: #c2c2c2;
}
#properties-container {
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: #4f4f4f;
}
#resources-container {
  right: 300px;
  bottom: 0;
  left: 300px;
  height: 300px;
  background-color: #242424;
}
</style>
