import { ComponentPublicInstance, PropType } from "vue";
import { NodeModel } from "./tree/NodeElement";

export type HierarchyProps = {
  treeModel: {
    require: boolean;
    type: PropType<NodeModel>;
    default: () => NodeModel;
  };
};

export type HierarchyData = {
  message: string;
};

export type HierarchyComputed = {
  isHierarchy: () => boolean;
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
