import { ComponentPublicInstance, PropType } from "vue";

export type NodeProps = {
  nodeModel: {
    require: boolean;
    type: PropType<NodeModel>;
    default: () => NodeModel;
  };
};

export type NodeData = {
  id: number;
  isOpen: boolean;
  toggler: HTMLElement;
  treeNodes: NodePublicInstance[];
};

export type NodeComputed = {
  isFolder: () => boolean;
  isVisible: () => boolean;
};

export type NodeMethods = {
  toggle: () => void;
  updateNode: (el: NodePublicInstance) => void;
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
