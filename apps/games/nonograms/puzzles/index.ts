import { PuzzleItem } from '../util/types';
import {
  chick,
  chicken,
  cow,
  balloon,
  tutorial1,
  tutorial2,
  tutorial3,
  cat,
  chef,
  dog,
  duck,
  farmer,
  fox,
  goat,
  goose,
  house,
  pig,
  rock,
  sheep,
  shrub,
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
    cat: {
      id: 'cat',
      name: 'cat',
      grid: cat,
      image: '/art/8x8/farm/cat.png',
      requires: 4,
    },
    chef: {
      id: 'chef',
      name: 'chef',
      grid: chef,
      image: '/art/8x8/farm/chef.png',
      requires: 4,
    },
    dog: {
      id: 'dog',
      name: 'dog',
      grid: dog,
      image: '/art/8x8/farm/dog.png',
      requires: 4,
    },
    duck: {
      id: 'duck',
      name: 'duck',
      grid: duck,
      image: '/art/8x8/farm/duck.png',
      requires: 5,
    },
    farmer: {
      id: 'farmer',
      name: 'farmer',
      grid: farmer,
      image: '/art/8x8/farm/farmer.png',
      requires: 5,
    },
    fox: {
      id: 'fox',
      name: 'fox',
      grid: fox,
      image: '/art/8x8/farm/fox.png',
      requires: 6,
    },
    goat: {
      id: 'goat',
      name: 'goat',
      grid: goat,
      image: '/art/8x8/farm/goat.png',
      requires: 7,
    },
    goose: {
      id: 'goose',
      name: 'goose',
      grid: goose,
      image: '/art/8x8/farm/goose.png',
      requires: 8,
    },
    house: {
      id: 'house',
      name: 'house',
      grid: house,
      image: '/art/8x8/farm/house.png',
      requires: 8,
    },
    pig: {
      id: 'pig',
      name: 'pig',
      grid: pig,
      image: '/art/8x8/farm/pig.png',
      requires: 9,
    },
    rock: {
      id: 'rock',
      name: 'rock',
      grid: rock,
      image: '/art/8x8/farm/rock.png',
      requires: 10,
    },
    sheep: {
      id: 'sheep',
      name: 'sheep',
      grid: sheep,
      image: '/art/8x8/farm/sheep.png',
      requires: 10,
    },
    shrub: {
      id: 'shrub',
      name: 'shrub',
      grid: shrub,
      image: '/art/8x8/farm/shrub.png',
      requires: 10,
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
  // sort by requirements
  p.sort((a, b) => a.requires - b.requires);
  return p;
};
