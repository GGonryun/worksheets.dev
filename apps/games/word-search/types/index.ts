export type ViewportEventHandler = (
  e: IntersectionObserverEntry | null
) => void;

export type Track = {
  column: number;
  row: number;
};

export type Rectangle = {
  center: { x: number; y: number };
  // x-points
  top: number;
  bottom: number;
  left: number;
  right: number;
  // size
  height: number;
  width: number;
  // top left corner
  x: number;
  y: number;
};

export type Registry = {
  [index: number]: Rectangle;
};

export type Pair = number[];
