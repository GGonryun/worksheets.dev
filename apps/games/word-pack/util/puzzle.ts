import { Direction } from '@worksheets/ui-games';

export type Entry = {
  word: string;
  grid: string[];
  positions: number[];
  directions: Direction[];
};

export type DictionaryByLength = Record<number, string[]>;

// A word slot determines a point in the grid where a word can start from and the direction it can go in
export class Slot {
  grid: boolean[][];
  direction: Direction;
  row: number;
  column: number;
  length: number;
  possibilities: string[]; //domain

  constructor(
    grid: boolean[][],
    direction: Direction,
    row: number,
    column: number
  ) {
    this.grid = grid;
    this.direction = direction;
    this.row = row;
    this.column = column;
    this.length = this.getLength();
    this.possibilities = [];
  }

  getLength(): number {
    if (this.direction === 'down') {
      return this.getHeight();
    }

    if (this.direction === 'right') {
      return this.getWidth();
    }

    throw new Error('Invalid direction');
  }

  private getWidth(): number {
    // if the direction is across, then the width is the length of the row
    let count = 1;
    let position = this.column + 1;
    while (this.grid[this.row][position]) {
      count++;
      position++;
    }

    return count;
  }

  private getHeight(): number {
    let count = 1;
    let position = this.row + 1;
    while (this.grid[position] && this.grid[position][this.column]) {
      count++;
      position++;
    }
    return count;
  }

  constrain(dictionary: DictionaryByLength) {
    this.possibilities = [...dictionary[this.length]];
  }
}

export const createPuzzle = (words: string[], gridSize: number): string[] => {
  return [];
};

const directions = ['down', 'right'];

type WordSlots = Record<'down' | 'right', Slot[]>;

export const findSlots = (layout: boolean[][]): WordSlots => {
  const locations: WordSlots = {
    down: [],
    right: [],
  };

  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout[i].length; j++) {
      const square = layout[i][j];
      for (let k = 0; k < directions.length; k++) {
        const direction = directions[k];
        // if the tile is empty we can't start a word here
        if (!square) continue;

        if (direction === 'right') {
          // if the tile to the left is empty
          // and the tile to the right is not empty
          // then this is the start of a word
          const left = j - 1;
          const isEmpty = left < 0 || !layout[i][left];
          const right = j + 1;
          const hasContent = right < layout[i].length && layout[i][right];
          if (isEmpty && hasContent) {
            const wordPosition = new Slot(layout, direction, i, j);
            locations[direction].push(wordPosition);
          }
        }

        if (direction === 'down') {
          // if the tile above is empty
          // and the subsequent tile is not empty
          // then this is the start of a word
          const above = i - 1;
          const isEmpty = above < 0 || !layout[above][j];
          const below = i + 1;
          const hasContent = below < layout.length && layout[below][j];
          if (isEmpty && hasContent) {
            const wordPosition = new Slot(layout, direction, i, j);
            locations[direction].push(wordPosition);
          }
        }
      }
    }
  }
  return locations;
};

export const fillSlots = (
  slots: WordSlots,
  wordsByLength: DictionaryByLength
) => {
  // for each slot, constrain the domain of possible words
  for (let i = 0; i < slots.down.length; i++) {
    const slot = slots.down[i];
    slot.constrain(wordsByLength);
  }
  for (let i = 0; i < slots.right.length; i++) {
    const slot = slots.right[i];
    slot.constrain(wordsByLength);
  }
};

export const constrainSlots = (slots: WordSlots) => {
  // the working list contains pairs of perpendicular slots that intersect at a point.
  const worklist = findIntersecting(slots);
  console.log('found worklist', worklist);
  while (worklist.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [left, right] = worklist.pop()!;
    if (reduce(left, right)) {
      if (left.possibilities.length === 0) {
        console.log('no possibilities left for', [left, right]);
      } else {
        console.info('reduced possibilities for', [left, right]);
        // repeat the process with the slots flipped.
        // worklist.push([right, left]);
      }
    }
  }
  console.log('puzzle constraints', slots);
  return slots;
};

const reduce = (left: Slot, right: Slot) => {
  const point = findIntersectingPoint(left, right);
  console.log('reducing', [left, right], point);
  let reduced = false;
  for (let i = 0; i < left.possibilities.length; i++) {
    const leftWord = left.possibilities[i];
    console.log('checking', leftWord);
    let satisfies = false;
    for (let j = 0; j < right.possibilities.length; j++) {
      const rightWord = right.possibilities[j];
      // do not allow intersecting words to be the same
      const doIntersect = leftWord[point.left] === rightWord[point.right];
      if (doIntersect) {
        console.log('found intersecting word', [leftWord, rightWord]);
        satisfies = true;
        break;
      }
    }
    if (!satisfies) {
      console.log('failed to satisfy', leftWord);
      left.possibilities.splice(i, 1);
      i--;
      reduced = true;
    }
  }
  return reduced;
};

// detects the index where the two words intersect
const findIntersectingPoint = (
  left: Slot,
  right: Slot
): { left: number; right: number } => {
  let leftWordIndex: number;
  let rightWordIndex: number;
  if (left.direction === 'right') {
    leftWordIndex = right.column - left.column;
    rightWordIndex = left.row - right.row;
  } else if (left.direction === 'down') {
    // leftWordIndex = left.column - right.column;
    // rightWordIndex = right.row - left.row;
    leftWordIndex = right.row - left.row;
    rightWordIndex = left.column - right.column;
  } else {
    throw new Error('Invalid direction');
  }

  if (leftWordIndex < 0 || rightWordIndex < 0) {
    throw new Error('Intersection is not valid');
  }

  return { left: leftWordIndex, right: rightWordIndex };
};

type IntersectingWords = [Slot, Slot];
type Intersections = IntersectingWords[];

const findIntersecting = (slots: WordSlots): Intersections => {
  const intersecting: Intersections = [];
  for (let i = 0; i < slots.right.length; i++) {
    for (let j = 0; j < slots.down.length; j++) {
      const right = slots.right[i];
      const down = slots.down[j];

      // detect if the two slots intersect
      const intersects = doIntersect(right, down);
      if (intersects) {
        intersecting.push([right, down]);
        intersecting.push([down, right]);
      }
    }
  }
  return intersecting;
};

const doIntersect = (a: Slot, b: Slot): boolean => {
  if (a.direction === b.direction) return false;

  if (a.direction === 'right' && b.direction === 'down') {
    return (
      a.column <= b.column &&
      b.column <= a.column + a.length &&
      b.row <= a.row &&
      a.row <= b.row + b.length
    );
  }
  if (a.direction === 'down' && b.direction === 'right') {
    return (
      a.row <= b.row &&
      b.row <= a.row + a.length &&
      b.column <= a.column &&
      a.column <= b.column + b.length
    );
  }
  throw new Error('Invalid direction');
};
