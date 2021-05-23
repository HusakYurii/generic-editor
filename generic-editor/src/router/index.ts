import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Editor from "@/components/Editor.vue";

export enum RouterPaths {
  Editor = "/editor"
};

const routes: Array<RouteRecordRaw> = [
  {
    name: "Editor",
    component: Editor,
    path: RouterPaths.Editor,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
