import { Direction, Track } from '@worksheets/ui-games';
import { shuffleArray } from '@worksheets/util/arrays';
import { Level } from '../puzzles';

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
    column: number,
    possibilities?: string[]
  ) {
    this.grid = grid;
    this.direction = direction;
    this.row = row;
    this.column = column;
    this.length = this.getLength();
    this.possibilities = possibilities ?? [];
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

  clone(): Slot {
    return new Slot(this.grid, this.direction, this.row, this.column, [
      ...this.possibilities,
    ]);
  }

  constrain(dictionary: DictionaryByLength) {
    const words = dictionary[this.length] ?? [];
    this.possibilities = shuffleArray([...words]);
  }

  constrainSingle(word: string) {
    // cannot constrain to words of different length than the slot can hold
    if (word.length !== this.length) {
      throw new Error('Invalid word length');
    }

    this.possibilities = [word];
  }

  next(track: Track): Track | undefined {
    // if the track is not in the slot, return undefined
    if (!this.includes(track)) return undefined;
    // pick the next track in the slot.
    let next = undefined;
    if (this.direction === 'down') {
      next = { row: track.row + 1, column: track.column };
    } else if (this.direction === 'right') {
      next = { row: track.row, column: track.column + 1 };
    } else {
      throw new Error('invalid direction');
    }
    // if the next track is not in the slot, return undefined
    if (!this.includes(next)) return undefined;
    // otherwise return the next track
    return next;
  }

  prev(track: Track): Track | undefined {
    if (!this.includes(track)) return undefined;
    let prev = undefined;
    if (this.direction === 'down') {
      prev = { row: track.row - 1, column: track.column };
    } else if (this.direction === 'right') {
      prev = { row: track.row, column: track.column - 1 };
    } else {
      throw new Error('invalid direction');
    }
    if (!this.includes(prev)) return undefined;
    return prev;
  }

  cells(): Track[] {
    // if im going down, then the cells are the rows
    if (this.direction === 'down') {
      const cells: Track[] = [];
      for (let i = 0; i < this.length; i++) {
        cells.push({ row: this.row + i, column: this.column });
      }
      return cells;
    }

    if (this.direction === 'right') {
      const cells: Track[] = [];
      for (let i = 0; i < this.length; i++) {
        cells.push({ row: this.row, column: this.column + i });
      }
      return cells;
    }

    throw new Error('Invalid direction');
  }

  includes(track: Track): boolean {
    return this.cells().some(
      (cell) => cell.row === track.row && cell.column === track.column
    );
  }

  serialize(slot: Slot): string {
    return JSON.stringify({
      grid: slot.grid,
      direction: slot.direction,
      row: slot.row,
      column: slot.column,
      possibilities: slot.possibilities,
    });
  }

  static deserialize(serialized: string): Slot {
    const serializedSlot = JSON.parse(serialized);
    return new Slot(
      serializedSlot.grid,
      serializedSlot.direction,
      serializedSlot.row,
      serializedSlot.column,
      serializedSlot.possibilities
    );
  }
}

const directions = ['down', 'right'];

export class WordSlots {
  down: Slot[];
  right: Slot[];
  constructor() {
    this.down = [];
    this.right = [];
  }

  find(track: Track, direction: Direction): Slot | undefined {
    // find the slot that contains the track
    if (direction === 'down') {
      return this.down.find((slot) => slot.includes(track));
    }
    if (direction === 'right') {
      return this.right.find((slot) => slot.includes(track));
    }
    throw new Error('Invalid direction');
  }

  owns(track: Track): Slot[] {
    const slots = [];
    for (let i = 0; i < this.down.length; i++) {
      const slot = this.down[i];
      if (slot.includes(track)) {
        slots.push(slot);
      }
    }
    for (let i = 0; i < this.right.length; i++) {
      const slot = this.right[i];
      if (slot.includes(track)) {
        slots.push(slot);
      }
    }

    return slots;
  }

  fill(dictionary: DictionaryByLength) {
    // for each slot, constrain the domain of possible words
    for (let i = 0; i < this.down.length; i++) {
      const slot = this.down[i];
      slot.constrain(dictionary);
    }
    for (let i = 0; i < this.right.length; i++) {
      const slot = this.right[i];
      slot.constrain(dictionary);
    }
  }

  add(slot: Slot) {
    if (slot.direction === 'down') {
      this.down.push(slot);
    } else if (slot.direction === 'right') {
      this.right.push(slot);
    } else {
      throw new Error('Invalid direction');
    }
  }

  clone(): WordSlots {
    const clone = new WordSlots();
    clone.down = this.down.map((slot) => slot.clone());
    clone.right = this.right.map((slot) => slot.clone());
    return clone;
  }

  spread(): Slot[] {
    const slots: Slot[] = [];
    for (let i = 0; i < this.down.length; i++) {
      const slot = this.down[i];
      slots.push(slot);
    }
    for (let i = 0; i < this.right.length; i++) {
      const slot = this.right[i];
      slots.push(slot);
    }
    return slots;
  }

  solved(): boolean {
    // each slot must only have one possibility
    if (this.spread().some((slot) => slot.possibilities.length > 1))
      return false;
    // there can be no duplicates between remaining possibilities
    if (this.hasDuplicates()) return false;

    return true;
  }

  hasDuplicates(): boolean {
    const remaining = this.spread().map((slot) => slot.possibilities[0]);
    const set = new Set(remaining);
    if (set.size !== remaining.length) {
      // console.info('solution has duplicates', remaining);
      return true;
    }

    return false;
  }

  words(): string[] {
    return this.spread().flatMap((slot) => slot.possibilities);
  }

  serialize(slots: WordSlots): string {
    return JSON.stringify({
      down: slots.down.map((slot) => slot.serialize(slot)),
      right: slots.right.map((slot) => slot.serialize(slot)),
    });
  }

  static deserialize(serialized: string): WordSlots {
    const serializedSlots = JSON.parse(serialized);
    const slots = new WordSlots();
    slots.down = serializedSlots.down.map((slot: string) =>
      Slot.deserialize(slot)
    );
    slots.right = serializedSlots.right.map((slot: string) =>
      Slot.deserialize(slot)
    );
    return slots;
  }
}

export const findSlots = (layout: boolean[][]): WordSlots => {
  const locations: WordSlots = new WordSlots();

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

export const constrainSlots = (slots: WordSlots) => {
  // the working list contains pairs of orthogonal slots that intersect at a point.
  const worklist = findIntersecting(slots);
  while (worklist.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [left, right] = worklist.pop()!;
    if (reduce(left, right)) {
      if (left.possibilities.length === 0) {
        return undefined;
      } else {
        worklist.unshift([left, right]);
        worklist.unshift([right, left]);
      }
    }
  }
  return slots;
};

const reduce = (left: Slot, right: Slot) => {
  const point = findIntersectingPoint(left, right);
  let reduced = false;
  for (let i = 0; i < left.possibilities.length; i++) {
    const leftWord = left.possibilities[i];
    let satisfies = false;
    for (let j = 0; j < right.possibilities.length; j++) {
      const rightWord = right.possibilities[j];
      // do not allow intersecting words to be the same
      const doIntersect = leftWord[point.left] === rightWord[point.right];
      if (doIntersect) {
        satisfies = true;
        break;
      }
    }
    if (!satisfies) {
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

type SolveEntry = {
  slots: WordSlots;
  index: number;
  word: string;
  visited: boolean;
};

// the depth protection prevents us from overwhelming the stack, but we may risk missing out on possible solutions to puzzles.
const DEPTH_PROTECTION = 5;
type PuzzleSolverOptions = {
  slots: WordSlots;
  protection?: number;
  deterministic?: boolean;
};
export const solvePuzzle = (options: PuzzleSolverOptions) => {
  const { slots } = options;
  const protection = options.protection ?? DEPTH_PROTECTION;
  const deterministic = options.deterministic ?? true;

  // if the puzzle is solved, return the solution
  if (!slots || slots.spread().length === 0 || slots.solved()) {
    return slots;
  }

  // create the stack of possible solutions
  const stack: SolveEntry[] = [];

  const firstSlot = slots.spread()[0];
  // if the puzzle is deterministic, we use the words in order of their appearance in the dictionary
  const words = deterministic
    ? firstSlot.possibilities
    : shuffleArray(firstSlot.possibilities);

  // push as many words as the protection allows
  for (let i = 0; i < words.length && i < protection; i++) {
    stack.push({
      slots: slots.clone(),
      index: 0,
      word: words[i],
      visited: false,
    });
  }

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      throw new Error('Could not find viable solution');
    }

    // try to solve the current stack entry
    const { slots, index, word, visited } = current;
    if (visited) {
      // we've been here before.
      continue;
    }
    // mark this entry as visited
    current.visited = true;
    const clone = slots.clone();
    const spread = clone.spread();

    const slot = spread[index];
    if (!slot) {
      // ran out of slots, backtracking
      continue;
    }

    slot.constrainSingle(word);

    // attempt to restrict slots further
    const solution = constrainSlots(clone);
    // slots restricted
    if (solution?.solved()) {
      // solved, didn't repeat
      return solution;
    }
    // possible solutions remaining
    const nextIndex = index + 1;
    const nextSlot = spread[nextIndex];
    if (nextSlot) {
      const words = deterministic
        ? nextSlot.possibilities
        : shuffleArray(nextSlot.possibilities);
      for (let i = 0; i < words.length && i < protection; i++) {
        stack.push({
          slots: clone,
          index: nextIndex,
          word: words[i],
          visited: false,
        });
      }
    }
  }
};

export type GeneratedPuzzle = {
  id: number;
  title: string;
  slots: WordSlots;
  grid: string[][];
  layout: boolean[][];
};

export const generatePuzzle = (id: number, puzzle: Level): GeneratedPuzzle => {
  const { title, layout, dictionary } = puzzle;

  const slots = findSlots(layout);
  slots.fill(dictionary);
  const initialConstraints = constrainSlots(slots);
  if (!initialConstraints) {
    throw Error('failed to create puzzle, unsatisfiable initial constraints');
  } else {
    const solution = solvePuzzle({
      slots: initialConstraints,
      deterministic: false,
    });
    if (!solution) {
      throw Error('failed to create puzzle, no solution found');
    } else {
      return {
        id,
        title: title,
        layout: layout,
        slots: solution,
        grid: convertToGrid(layout, solution),
      };
    }
  }
};

const convertToGrid = (layout: boolean[][], slots: WordSlots): string[][] => {
  // create a string copy of the grid so we can place letters in it
  const grid: string[][] = [];
  for (let i = 0; i < layout.length; i++) {
    grid[i] = [];
    for (let j = 0; j < layout[i].length; j++) {
      grid[i][j] = layout[i][j] ? '?' : '';
    }
  }
  for (const slot of slots.spread()) {
    const { row, column, direction, possibilities } = slot;
    const word = possibilities[0];
    const wordArray = word.split('');
    if (direction === 'right') {
      for (let i = 0; i < wordArray.length; i++) {
        grid[row][column + i] = wordArray[i];
      }
    } else if (direction === 'down') {
      for (let i = 0; i < wordArray.length; i++) {
        grid[row + i][column] = wordArray[i];
      }
    }
  }

  return grid;
};

export const serializePuzzle = (puzzle: GeneratedPuzzle): string => {
  const { id, title, grid, layout, slots } = puzzle;
  const serialized = {
    id,
    title,
    grid,
    layout,
    slots: slots.serialize(slots),
  };
  return JSON.stringify(serialized);
};

export const deserializePuzzle = (string: string): GeneratedPuzzle => {
  const { id, title, grid, layout, slots } = JSON.parse(string);
  return {
    id,
    title,
    grid,
    layout,
    slots: WordSlots.deserialize(slots),
  };
};

export const checkPuzzle = (slots: WordSlots, selections: string[][]) => {
  // check if all the words have been placed
  const target = slots.words();
  const words = getWords(slots, selections);
  if (target.length !== words.length) return false;
  // make sure all the words match
  for (const word of words) {
    if (!target.includes(word)) return false;
  }

  return true;
};

export const getWords = (slots: WordSlots, selections: string[][]) => {
  const words: string[] = [];
  // check each slot's position against placements and push the word into the array
  for (const down of slots.down) {
    let letters = '';
    for (let i = 0; i < down.length; i++) {
      const row = selections[down.row + i];
      if (selections[down.row + i]) {
        letters += row[down.column] ?? '';
      }
    }
    words.push(letters);
  }

  for (const right of slots.right) {
    let letters = '';
    for (let i = 0; i < right.length; i++) {
      const row = selections[right.row];
      if (row) {
        letters += row[right.column + i] ?? '';
      }
    }
    words.push(letters);
  }

  return words;
};
