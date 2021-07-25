import { IEditorStore } from "@/components/EditorStore";
import { ComponentPublicInstance } from "vue";
import { Bounds, NodePublicInstance } from "./NodeElement";

export type TreeProps = {
  // TBD
};

export type TreeData = {
  editorStore: IEditorStore;
  treeNodes: NodePublicInstance[];
  isClicked: boolean;
  mouseButtons: number[];
  nodes: {
    current: NodePublicInstance | null;
    parent: NodePublicInstance | null;
  };
};

export type TreeComputed = {
  isRoot: () => boolean;
};

export type SearchResult = {
  node: NodePublicInstance | null;
  bounds: Bounds;
};

export type TreeMethods = {
  updateNode: (el: NodePublicInstance) => void;
  onMouseDown: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
};

export type TreePublicInstance = ComponentPublicInstance<
  TreeProps,
  unknown,
  TreeData,
  TreeComputed,
  TreeMethods
>;
