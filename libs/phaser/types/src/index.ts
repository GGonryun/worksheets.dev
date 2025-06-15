export type Direction = 'up' | 'down' | 'left' | 'right';
export type Axis = 'horizontal' | 'vertical';
export type Movement = { angle: number; force: number };
export type Coordinate = { row: number; col: number };
export type Size = { width: number; height: number };
export type Point = { x: number; y: number };
export type Bounds = Point & Size;

export type PlayerInput = { isDown: boolean };
export type DirectionalInput = {
  left: PlayerInput;
  right: PlayerInput;
  up: PlayerInput;
  down: PlayerInput;
};
