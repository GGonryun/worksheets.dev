export type Point = {
  x: number;
  y: number;
};

export type RectLike = {
  left: number;
  top: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
};
export type RectPlane = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export const areEqual = (a: Point, b: Point) => {
  return a.x === b.x && a.y === b.y;
};

export const convertToPoint = (i: number, width: number): Point => {
  return {
    x: i % width,
    y: Math.floor(i / width),
  };
};

export const distanceBetween = (a: Point, b: Point) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

export const isRectPlane = (plane: RectPlane): plane is RectPlane => {
  return (
    plane.left != null &&
    plane.top != null &&
    plane.width != null &&
    plane.height != null
  );
};

export const intersectingRect = (
  a: DOMRect | RectPlane,
  b: DOMRect | RectPlane
) => {
  const rectA = makeRect(a);
  const rectB = makeRect(b);
  // check to see if two rectangles are intersecting.
  return (
    rectA.left <= rectB.right &&
    rectB.left <= rectA.right &&
    rectA.top <= rectB.bottom &&
    rectB.top <= rectA.bottom
  );
};

export const makeRect = (a: DOMRect | RectPlane): DOMRect => {
  if (a instanceof DOMRect) {
    return a;
  } else if (isRectPlane(a)) {
    return new DOMRect(a.left, a.top, a.width, a.height);
  } else {
    throw new Error('Invalid shape');
  }
};
