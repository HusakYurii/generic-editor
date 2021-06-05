import { ComponentPublicInstance, PropType } from "vue";

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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
  getBounds: () => Bounds;
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

/**
 * [1] если я нажал на єлемент, а он не существует - возврат из функции
 * [1] если я нажал на єлемент но этот элемент является корневым - возврат из функции
 * [1] если я мытаюсь присвоить родителя его ребенку - возврат
 * [1] если я выбрал елетент и пытаюсь присвоить его сам себе - возврат
 * [X] Вставить данные
 * [X] Определить куда вставить данные - перед или после родилея
 *   [X] вставть данніе после выбранного елеинта
 *   [ ] вставить данные перед выбраным элемеентом
 * [x] Курсос мышы вышел за приделы дерева - сбросить
 */
