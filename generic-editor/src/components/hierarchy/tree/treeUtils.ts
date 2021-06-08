import {
  BorderTypes,
  NodePublicInstance,
  NodeModel,
  Bounds,
} from "./NodeElement";
import { SearchResult } from "./TreeElement";

export const isInside = (bounds: Bounds, x: number, y: number): boolean => {
  return (
    x > bounds.x &&
    x < bounds.x + bounds.width &&
    y > bounds.y &&
    y < bounds.y + bounds.height
  );
};

export const findElement = (
  x: number,
  y: number,
  treeNodes: NodePublicInstance[]
): SearchResult => {
  for (let i = 0; i < treeNodes.length; i += 1) {
    const bounds = treeNodes[i].getBounds();

    if (isInside(bounds, x, y)) {
      return { bounds, node: treeNodes[i] };
    }

    const result = findElement(x, y, treeNodes[i].treeNodes);

    if (result.node) {
      return {
        bounds: result.bounds,
        node: result.node,
      };
    }
  }
  // if wasn't found
  return { bounds: { x: 0, y: 0, width: 0, height: 0 }, node: null };
};

export const getPositionInTheBox = (
  x: number,
  y: number,
  bounds: Bounds
): BorderTypes | null => {
  const top: Bounds = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height * 0.2,
  };

  const center: Bounds = {
    x: bounds.x,
    y: bounds.y + bounds.height * 0.2,
    width: bounds.width,
    height: bounds.height * 0.6,
  };

  if (isInside(top, x, y)) return BorderTypes.Top;
  if (isInside(center, x, y)) return BorderTypes.Center;
  else return null;
};

export const findElementByID = (
  id: number,
  treeNodes: NodePublicInstance[]
): NodePublicInstance | null => {
  for (let i = 0; i < treeNodes.length; i += 1) {
    if (treeNodes[i].id === id) {
      return treeNodes[i];
    }

    const node = findElementByID(id, treeNodes[i].treeNodes);

    if (node) {
      return node;
    }
  }

  return null;
};

/* Utils for working with models
 */

export const findNodeByID = (
  treeModel: NodeModel,
  nodeID: number
): NodeModel | null => {
  // if trying to find itself, I don't now why, but)
  if (treeModel.id === nodeID) {
    return treeModel;
  }

  for (let i = 0; i < treeModel.children.length; i++) {
    const nodeModel = treeModel.children[i];

    if (nodeModel.id === nodeID) {
      return nodeModel;
    }

    const foundModel = findNodeByID(nodeModel, nodeID);
    if (foundModel) {
      return foundModel;
    }
  }

  return null;
};

export const isChildNode = (
  treeModel: NodeModel,
  parentID: number,
  childID: number
): boolean => {
  const parentModel = findNodeByID(treeModel, parentID);
  if (!parentModel) {
    return false;
  }

  return parentModel.children.some((node) => node.id === childID);
};

export const isSameNode = (
  firstNode: { id: number },
  secondNode: { id: number }
): boolean => {
  return firstNode.id === secondNode.id;
};

export const isNextNode = (
  treeModel: NodeModel,
  currentID: number,
  nextID: number
): boolean => {
  const currModel = treeModel.children.find((node) => node.id === currentID);

  if (currModel) {
    const index = treeModel.children.indexOf(currModel);
    const nextModel = treeModel.children[index + 1];
    return nextModel && nextModel.id === nextID;
  }

  for (let i = 0; i < treeModel.children.length; i++) {
    if (isNextNode(treeModel.children[i], currentID, nextID)) {
      return true;
    }
  }
  return false;
};

export const removeNode = (
  treeModel: NodeModel,
  nodeID: number
): NodeModel | null => {
  for (let i = 0; i < treeModel.children.length; i++) {
    const nodeModel = treeModel.children[i];

    if (nodeModel.id === nodeID) {
      return treeModel.children.splice(i, 1)[0];
    }

    const result = removeNode(nodeModel, nodeID);
    if (result) {
      return result;
    }
  }

  return null;
};

export const appendNode = (
  treeModel: NodeModel,
  parentID: number,
  nodeModel: NodeModel
): boolean => {
  if (treeModel.id === parentID) {
    treeModel.children.push(nodeModel);
    return true;
  }

  for (let i = 0; i < treeModel.children.length; i++) {
    if (appendNode(treeModel.children[i], parentID, nodeModel)) {
      return true;
    }
  }

  return false;
};

export const insertBeforeNode = (
  treeModel: NodeModel,
  refNodeID: number,
  nodeModel: NodeModel
): boolean => {
  const refNode = treeModel.children.find((node) => node.id === refNodeID);

  if (refNode) {
    const index = treeModel.children.indexOf(refNode);
    treeModel.children.splice(index, 0, nodeModel);
    return true;
  }

  for (let i = 0; i < treeModel.children.length; i++) {
    if (insertBeforeNode(treeModel.children[i], refNodeID, nodeModel)) {
      return true;
    }
  }
  return false;
};
