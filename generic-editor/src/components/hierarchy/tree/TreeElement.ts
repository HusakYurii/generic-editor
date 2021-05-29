import { ComponentPublicInstance, PropType } from "vue";
import { NodeModel, NodePublicInstance } from "./NodeElement";

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

export type TreeMethods = {
  updateNode: (el: NodePublicInstance) => void;
  onMouseMove: (event: MouseEvent) => void;
  findElement: (x: number, y: number, elements: NodePublicInstance[]) => number;
};

export type TreePublicInstance = ComponentPublicInstance<
  TreeProps,
  unknown,
  TreeData,
  TreeComputed,
  TreeMethods
>;
