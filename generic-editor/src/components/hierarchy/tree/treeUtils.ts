import { BorderTypes, NodePublicInstance } from "./NodeElement";
import { Bounds, Result } from "./TreeElement";

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
  let bounds: Bounds = { x: 0, y: 0, width: 0, height: 0 };
  let node: NodePublicInstance | null = null;

  for (let i = 0; i < treeNodes.length; i += 1) {
    bounds = treeNodes[i].toggler.getBoundingClientRect();

    if (isInside(bounds, x, y)) {
      return { bounds, node: treeNodes[i] };
    }

    if (node === null) {
      const result = findElement(x, y, treeNodes[i].treeNodes);
      bounds = result.bounds;
      node = result.node;
    }
    if (node !== null) {
      return { bounds, node };
    }
  }
  return { bounds, node };
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
