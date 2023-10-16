import { PuzzleItem } from '../util/types';
import {
  chick,
  chicken,
  cow,
  balloon,
  tutorial1,
  tutorial2,
  tutorial3,
} from './nonograms';

export const puzzles: Record<string, Record<string, PuzzleItem>> = {
  tutorial: {
    'tutorial-1': {
      id: 'tutorial-1',
      name: 'The Line',
      grid: tutorial1,
      image: '/art/tutorial/line.svg',
      requires: 0,
    },
    'tutorial-2': {
      id: 'tutorial-2',
      name: 'The Square',
      grid: tutorial2,
      image: '/art/tutorial/square.svg',
      requires: 1,
    },
    'tutorial-3': {
      id: 'tutorial-3',
      name: 'Happy Face',
      grid: tutorial3,
      image: '/art/tutorial/happy.svg',
      requires: 2,
    },
  },
  farm: {
    chick: {
      id: 'chick',
      name: 'Chick',
      grid: chick,
      image: '/art/8x8/farm/chick.png',
      requires: 3,
    },
    chicken: {
      id: 'chicken',
      name: 'Chicken',
      grid: chicken,
      image: '/art/8x8/farm/chicken.png',
      requires: 3,
    },
    cow: {
      id: 'cow',
      name: 'cow',
      grid: cow,
      image: '/art/8x8/farm/cow.png',
      requires: 3,
    },
  },
  assorted: {
    balloon: {
      id: 'balloon',
      name: 'balloon',
      grid: balloon,
      image: '/art/16x16/assorted/balloon.png',
      requires: 5,
    },
  },
};

export const hasPuzzle = (id: string): boolean => {
  const puzzle = Object.values(puzzles).flatMap((p) => Object.values(p));
  return puzzle.some((p) => p.id === id);
};

export const findPuzzle = (id: string): PuzzleItem => {
  // puzzles should have unique id's even between themes.
  const puzzle = Object.values(puzzles).flatMap((p) => Object.values(p));
  const found = puzzle.find((p) => p.id === id);
  if (!found) throw new Error(`Puzzle ${id} not found`);
  return found;
};

export const listPuzzles = (): PuzzleItem[] => {
  const p = Object.values(puzzles).flatMap((p) => Object.values(p));
  return p;
};
