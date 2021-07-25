import { ComponentPublicInstance } from "vue";
import { IEditorStore } from "../EditorStore";

export type HierarchyProps = {
  // TBD
};

export type HierarchyData = {
  message: string;
  editorStore: IEditorStore;
};

export type HierarchyComputed = {
  canDeleteNode: () => boolean;
};

export type HierarchyMethods = {
  onContextmenu: (event: Event) => void;
};

export type HierarchyPublicInstance = ComponentPublicInstance<
  HierarchyProps,
  unknown,
  HierarchyData,
  HierarchyComputed,
  HierarchyMethods
>;
