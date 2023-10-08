import { Point } from 'framer-motion';

export type Track = {
  column: number;
  row: number;
};

export type Direction =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

export const directions: Direction[] = [
  'up',
  'down',
  'left',
  'right',
  'up-left',
  'up-right',
  'down-left',
  'down-right',
];

export const linearDirections: Direction[] = ['up', 'down', 'left', 'right'];

export const legibleDirections: Direction[] = ['down', 'right'];

export const oppositeDirections: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
  'up-left': 'down-right',
  'up-right': 'down-left',
  'down-left': 'up-right',
  'down-right': 'up-left',
};

export const perpendicularDirections: Record<Direction, Direction[]> = {
  up: ['left', 'right'],
  down: ['left', 'right'],
  left: ['up', 'down'],
  right: ['up', 'down'],
  'up-left': ['up', 'left'],
  'up-right': ['up', 'right'],
  'down-left': ['down', 'left'],
  'down-right': ['down', 'right'],
};

export const parallelDirections: Record<Direction, Direction[]> = {
  up: ['up', 'down'],
  down: ['down', 'up'],
  left: ['left', 'right'],
  right: ['right', 'left'],
  'up-left': ['up-left', 'down-right'],
  'up-right': ['up-right', 'down-left'],
  'down-left': ['down-left', 'up-right'],
  'down-right': ['down-right', 'up-left'],
};

export const indexToColumn = (index: number, columns: number) =>
  index % columns;

export const indexToRow = (index: number, columns: number) =>
  Math.floor(index / columns);

export const indexToTrack = (index: number, columns: number): Track => ({
  column: indexToColumn(index, columns),
  row: indexToRow(index, columns),
});

export const trackToIndex = (track: Track, columns: number): number =>
  track.row * columns + track.column;

export const directionToTrack = (direction: Direction): Track => {
  switch (direction) {
    case 'up':
      return { row: -1, column: 0 };
    case 'down':
      return { row: 1, column: 0 };
    case 'left':
      return { row: 0, column: -1 };
    case 'right':
      return { row: 0, column: 1 };
    case 'up-left':
      return { row: -1, column: -1 };
    case 'up-right':
      return { row: -1, column: 1 };
    case 'down-left':
      return { row: 1, column: -1 };
    case 'down-right':
      return { row: 1, column: 1 };
  }
};

export const calculateMovement = (
  track: Track,
  direction: Direction,
  movement: number
) => {
  switch (direction) {
    case 'up':
      return { ...track, row: track.row - movement };
    case 'down':
      return { ...track, row: track.row + movement };
    case 'left':
      return { ...track, column: track.column - movement };
    case 'right':
      return { ...track, column: track.column + movement };
    case 'up-left':
      return {
        ...track,
        row: track.row - movement,
        column: track.column - movement,
      };
    case 'up-right':
      return {
        ...track,
        row: track.row - movement,
        column: track.column + movement,
      };
    case 'down-left':
      return {
        ...track,
        row: track.row + movement,
        column: track.column - movement,
      };
    case 'down-right':
      return {
        ...track,
        row: track.row + movement,
        column: track.column + movement,
      };
  }
};

export const getDirection = (a: Track, b: Track): Direction | null => {
  const dy = b.row - a.row;
  const dx = b.column - a.column;

  if (dx === 0 && dy === 0) return null;

  if (dx === 0 && dy < 0) return 'up';
  if (dx === 0 && dy > 0) return 'down';
  if (dx < 0 && dy === 0) return 'left';
  if (dx > 0 && dy === 0) return 'right';
  if (dx < 0 && dy < 0) return 'up-left';
  if (dx > 0 && dy < 0) return 'up-right';
  if (dx < 0 && dy > 0) return 'down-left';
  if (dx > 0 && dy > 0) return 'down-right';

  throw new Error('Invalid direction');
};

export const getTrackLine = (a: Track, b: Track): Track[] => {
  // starting from a, proceed in the direction of b until you reach b.
  const tracks: Track[] = [];

  const direction = getDirection(a, b);
  if (!direction) return [];

  let current = a;
  while (current.column !== b.column || current.row !== b.row) {
    tracks.push(current);
    current = calculateMovement(current, direction, 1);
  }

  return tracks.concat(b);
};

export const getCenter = (
  index: number | null | undefined,
  registry: Registry
): Point | null => {
  if (index == null) return null;

  const rect = registry[index];

  if (!rect) return null;

  return rect.center;
};

export const isOnTrack = (a: Track, b: Track): boolean => {
  const dy = b.row - a.row;
  const dx = b.column - a.column;

  return dx === 0 || dy === 0 || dx === dy || dx === -dy;
};

export type ViewportEventHandler = (
  e: IntersectionObserverEntry | null
) => void;

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
