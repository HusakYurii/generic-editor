import {
  BorderTypes,
  NodePublicInstance,
  NodeModel,
  Bounds,
} from "./NodeElement";
import { Result } from "./TreeElement";

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
): Result => {
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

  const bottom: Bounds = {
    x: bounds.x,
    y: bounds.y + bounds.height * 0.8,
    width: bounds.width,
    height: bounds.height * 0.2,
  };

  if (isInside(top, x, y)) return BorderTypes.Top;
  if (isInside(center, x, y)) return BorderTypes.Center;
  if (isInside(bottom, x, y)) return BorderTypes.Bottom;
  else return null;
};

export const isSameNode = (
  element1: NodePublicInstance,
  element2: NodePublicInstance
): boolean => {
  return element1.id === element2.id;
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

export const isChild = (
  parent: NodePublicInstance,
  child: NodePublicInstance
): boolean => {
  const result = findElementByID(child.id, parent.treeNodes);
  return Boolean(result);
};

/* Utils for working with models
 */
export const removeModel = (
  treeModel: NodeModel,
  childNodeID: number
): boolean => {
  for (let i = 0; i < treeModel.children.length; i++) {
    const nodeModel = treeModel.children[i];

    if (nodeModel.id === childNodeID) {
      treeModel.children.splice(i, 1);
      return true;
    }

    if (removeModel(nodeModel, childNodeID)) {
      return true;
    }
  }

  return false;
};

export const insert = (
  treeModel: NodeModel,
  parentNodeID: number,
  model: NodeModel
): boolean => {
  if (treeModel.id === parentNodeID) {
    treeModel.children.push(model);
    return true;
  }

  for (let i = 0; i < treeModel.children.length; i++) {
    const nodeModel = treeModel.children[i];

    if (insert(nodeModel, parentNodeID, model)) {
      return true;
    }
  }

  return false;
};
