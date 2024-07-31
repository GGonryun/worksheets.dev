export type Coordinate = {
  x: number;
  y: number;
};
export type Line = { p1: Coordinate; p2: Coordinate };

export type PointObject = { name: string; x: number; y: number };
export type RectangleObject = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
