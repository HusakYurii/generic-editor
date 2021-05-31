import { ComponentPublicInstance, PropType } from "vue";

export type NodeProps = {
  nodeModel: {
    require: boolean;
    type: PropType<NodeModel>;
    default: () => NodeModel;
  };
};

export enum BorderTypes {
  Top = "Top",
  Center = "Center",
  Bottom = "Bottom",
}

export type NodeData = {
  id: number;
  isOpen: boolean;
  toggler: HTMLElement;
  treeNodes: NodePublicInstance[];
  borderClassesMap: Record<BorderTypes, string>;
};

export type NodeComputed = {
  isFolder: () => boolean;
  isVisible: () => boolean;
};

export type NodeMethods = {
  toggle: () => void;
  updateNode: (el: NodePublicInstance) => void;
  showBorder: (side: BorderTypes) => void;
  removeBorders: () => void;
  copyModel: () => NodeModel;
};

export type NodeModel = {
  id: number;
  name: string;
  isDraggable: boolean;
  isVisible: boolean;
  children: NodeModel[];
};

export type NodePublicInstance = ComponentPublicInstance<
  NodeProps,
  unknown,
  NodeData,
  NodeComputed,
  NodeMethods
>;
