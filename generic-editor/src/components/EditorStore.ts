import { NodeModel } from "./hierarchy/tree/NodeElement";

export const generateID = (() => {
  let id = 0;
  return () => {
    return id++;
  };
})();

export interface IEditorStore {
  treeModel: NodeModel;
}

export const editorStore: IEditorStore = {
  treeModel: {
    id: generateID(),
    name: "Root",
    isVisible: true,
    isDraggable: false,
    children: [],
  },
};
