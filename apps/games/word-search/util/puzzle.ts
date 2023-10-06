import {
  arrayFromLength,
  selectRandomItem,
  shuffleArray,
} from '@worksheets/util/arrays';
import {
  directions,
  Direction,
  directionToTrack,
  indexToTrack,
  trackToIndex,
  alphabet,
} from '.';

export type Entry = {
  word: string;
  grid: string[];
  positions: number[];
  directions: Direction[];
};

// inspired by https://weblog.jamisbuck.org/2015/9/26/generating-word-search-puzzles.html
export const createPuzzle = (
  words: string[],
  columns: number,
  rows: number
) => {
  const grid = fillGrid(words, columns, rows);

  if (!grid) throw new Error('Failed to create puzzle.');
  // fill all empty spaces with random letters.
  grid.forEach((letter, index) => {
    if (letter === '') {
      grid[index] = selectRandomItem(alphabet);
    }
  });

  return grid;
};

const fillGrid = (words: string[], columns: number, rows: number) => {
  const size = columns * rows;
  // keep track of remaining words
  const remaining = [...words];
  // create the first word in the puzzle.
  const stack: Entry[] = [
    {
      word: remaining.shift()!,
      grid: arrayFromLength(size).map(() => ''),
      // keep track of all the possible indicies that the word can be placed.
      positions: shuffleArray(arrayFromLength(size).map((_, i) => i)),
      directions: shuffleArray([...directions]),
    },
  ];

  let attempts = 100000;
  while (attempts-- > 0) {
    const current = stack[0];
    // console.log('current word: ', current.word);
    if (current == null) return undefined;

    const position = current.positions[0];
    if (position == null) {
      // console.log('no positions left, try a new word');
      stack.shift();
      remaining.unshift(current.word);
      continue;
    }

    const direction = current.directions.shift();
    // console.log('current direction: ', direction);
    if (!direction) {
      // console.log('no directions left, try a new position');
      current.positions.shift();
      current.directions = shuffleArray([...directions]);
      continue;
    }

    const grid = placeWord(
      { slots: current.grid, columns, rows },
      current.word,
      position,
      direction
    );

    // if we failed to place the word, try again.
    if (grid == null) continue;

    // if we placed the word, remove it from the remaining words.
    if (!remaining.length) return grid;
    stack.unshift({
      word: remaining.shift()!,
      grid,
      positions: shuffleArray(arrayFromLength(size).map((_, i) => i)),
      directions: shuffleArray([...directions]),
    });
  }

  return stack[0].grid;
};

type Grid = {
  slots: string[];
  columns: number;
  rows: number;
};

const placeWord = (
  grid: Grid,
  word: string,
  position: number,
  direction: Direction
) => {
  // clone the letters array, we'll try to place the word in this array first.
  const clone = [...grid.slots];
  // get movement for the next letter.
  const movement = directionToTrack(direction);
  // convert the starting position to a track.
  const track = indexToTrack(position, grid.columns);
  // iterate over the letters in the word and place it in the grid.
  for (let i = 0; i < word.length; i++) {
    const index = trackToIndex(track, grid.columns);
    // if the letter at the index is not empty and it's not the same as the letter we're trying to place, then the word doesn't fit.
    const isViablePosition = clone[index] === '' || clone[index] === word[i];
    if (!isViablePosition) return undefined;

    clone[index] = word[i];

    track.column += movement.column;
    track.row += movement.row;
    // if the next letter is out of bounds, the word doesn't fit.
    if (track.column < 0 || track.column > grid.columns) return undefined;
    if (track.row < 0 || track.row > grid.rows) return undefined;
  }

  // if the word has placed all of its letters, then it fits.
  return clone;
};
