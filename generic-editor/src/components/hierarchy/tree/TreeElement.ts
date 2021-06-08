import { ComponentPublicInstance, PropType } from "vue";
import { Bounds, NodeModel, NodePublicInstance } from "./NodeElement";

export type TreeProps = {
  treeModel: {
    require: boolean;
    type: PropType<NodeModel>;
    default: () => NodeModel;
  };
};

export type TreeData = {
  treeNodes: NodePublicInstance[];
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
