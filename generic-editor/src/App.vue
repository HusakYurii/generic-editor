<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterPaths } from "./router";

export default defineComponent({
  name: "App",
  mounted(): void {
    this.$router.push(RouterPaths.Editor);
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 10px;
  color: "#000000";
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
