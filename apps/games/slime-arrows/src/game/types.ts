import { TypedEventEmitter } from '@worksheets/phaser/events';
import { Direction } from '@worksheets/phaser/types';

export type DeltaValue<T = number> = { from: T; to: T };
export type PositionDelta = { x?: DeltaValue; y?: DeltaValue };
export type DirectionPositionDelta = Record<Direction, PositionDelta>;
export const ARROW_OBJECT_TYPE = 'arrow';

export type SceneEventEmitter = TypedEventEmitter<{
  showCredits: [];
  hideCredits: [];
  hideGameOver: [];
  startGame: [];
  endGame: [];
}>;
