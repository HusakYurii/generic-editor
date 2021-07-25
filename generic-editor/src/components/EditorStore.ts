import { NodeModel } from "./hierarchy/tree/NodeElement";

export const generateID = (() => {
  let id = 100;
  return () => {
    return id++;
  };
})();

export interface IEditorStore {
  selectedNode: NodeModel | null;
  treeModel: NodeModel;
}

export const editorStore: IEditorStore = {
  selectedNode: null,
  treeModel: {
    id: 0,
    name: "Root",
    isVisible: true,
    children: [
      {
        id: generateID(),
        name: "Container",
        isVisible: true,
        children: [],
      },
      {
        id: generateID(),
        name: "Sprite",
        isVisible: true,
        children: [
          {
            id: generateID(),
            name: "Text",
            isVisible: true,
            children: [],
          },
        ],
      },
    ],
  },
};
