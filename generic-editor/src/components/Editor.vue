<template>
  <div id="editor">
    <div id="hierarchy">
      <Hierarchy />
    </div>

    <div id="canvas">
      <Canvas />
    </div>

    <div id="properties">
      <Properties />
    </div>

    <div id="resources">
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
  min-width: 1200px;
  min-height: 1000px;
  height: 100vh;
}
#hierarchy,
#canvas,
#properties,
#resources {
  position: absolute;
}
#hierarchy {
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  background-color: #4f4f4f;
}
#canvas {
  top: 0;
  right: 300px;
  bottom: 300px;
  left: 300px;
  background-color: #c2c2c2;
}
#properties {
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: #4f4f4f;
}
#resources {
  right: 300px;
  bottom: 0;
  left: 300px;
  height: 300px;
  background-color: #242424;
}
</style>
