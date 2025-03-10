export type Movement = { angle: number; force: number };

export type Direction = 'up' | 'down' | 'left' | 'right';
export type Axis = 'horizontal' | 'vertical';

export type PlayerInput = {
  isDown: boolean;
};

export type DirectionalInput = {
  left: PlayerInput;
  right: PlayerInput;
  up: PlayerInput;
  down: PlayerInput;
};
