import { NodeModel } from "./NodeElement";

export const generateID = (() => {
  let id = 0;
  return () => {
    return id++;
  };
})();

export const treeModelMock: NodeModel = {
  id: -1000,
  name: "Root",
  isVisible: true,
  isDraggable: false,
  children: [
    {
      id: generateID(),
      name: "child-1",
      isVisible: true,
      isDraggable: true,
      children: [],
    },
    {
      id: generateID(),
      name: "child-2",
      isVisible: true,
      isDraggable: true,
      children: [],
    },
    {
      id: generateID(),
      name: "child-3",
      isVisible: true,
      isDraggable: true,
      children: [
        {
          id: generateID(),
          name: "child-3.1",
          isVisible: true,
          isDraggable: true,
          children: [
            {
              id: generateID(),
              name: "child-3.1.1",
              isVisible: true,
              isDraggable: true,
              children: [],
            },
            {
              id: generateID(),
              name: "child-3.1.2",
              isVisible: true,
              isDraggable: true,
              children: [],
            },
          ],
        },
        {
          id: generateID(),
          name: "child-3.2",
          isVisible: true,
          isDraggable: true,
          children: [],
        },
        {
          id: generateID(),
          name: "child-3.3",
          isVisible: true,
          isDraggable: true,
          children: [],
        },
        {
          id: generateID(),
          name: "child-3.4",
          isVisible: true,
          isDraggable: true,
          children: [
            {
              id: generateID(),
              name: "child-3.4.1",
              isVisible: true,
              isDraggable: true,
              children: [],
            },
            {
              id: generateID(),
              name: "child-3.4.2",
              isVisible: true,
              isDraggable: true,
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
