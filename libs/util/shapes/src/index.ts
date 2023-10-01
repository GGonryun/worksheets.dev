export type Point = {
  x: number;
  y: number;
};

// web rectangles have x values that increase from left to right.
// and y values and increase from top to bottom.
export type WebRectangle = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export const isInRect = (p: Point, r: WebRectangle) => {
  return p.x >= r.left && p.x <= r.right && p.y <= r.bottom && p.y >= r.top;
};
