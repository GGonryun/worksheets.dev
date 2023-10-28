import { lowerCaseAlphabet } from '@worksheets/ui-games';
import {
  OrganizedByLength,
  dictionaryByLength,
  elementaryDictionaryByLength,
} from '@worksheets/util-dictionary';
import { arrayFromLength, selectRandomItem } from '@worksheets/util/arrays';
import { randomBetween } from '@worksheets/util/numbers';

export type PuzzleGrid = string[][];

export type GeneratedPuzzle = {
  grid: PuzzleGrid;
  target: string;
};

export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';
const extraLetters: Record<Difficulty, number[]> = {
  easy: [3, 5],
  medium: [5, 8],
  hard: [7, 11],
  extreme: [7, 11],
};

const wordSize: Record<Difficulty, number[]> = {
  easy: [4, 6],
  medium: [4, 7],
  hard: [5, 9],
  extreme: [6, 11],
};

const dictionaryOption: Record<Difficulty, OrganizedByLength> = {
  easy: elementaryDictionaryByLength,
  medium: elementaryDictionaryByLength,
  hard: elementaryDictionaryByLength,
  extreme: dictionaryByLength,
};

export const generatePuzzle = (difficulty: Difficulty): GeneratedPuzzle => {
  const possibleSizes = wordSize[difficulty];
  const size = randomBetween(possibleSizes[0], possibleSizes[1]);

  const dictionary = dictionaryOption[difficulty];
  // pick a random word from the dictionary
  const word = selectRandomItem(dictionary[size]);
  // create a grid of the same size
  // fill the grid with random letters
  const empty = arrayFromLength(size);
  const grid = empty.map(() => [] as string[]);
  // add extra letters depending on the length of the word too.
  // we'll add 1 extra letters for every 3 letters in the word
  // we'll also add the length of the word to the number of extra letters
  const possibleLetters = extraLetters[difficulty];
  const randomExtra = randomBetween(possibleLetters[0], possibleLetters[1]);
  const extra = randomExtra + Math.floor(word.length / 3);

  // fill the grid with random letters
  for (let i = 0; i < extra; i++) {
    const row = Math.floor(Math.random() * size);
    grid[row].push(selectRandomItem(lowerCaseAlphabet));
  }
  // randomly insert the target word into the grid
  for (let i = 0; i < word.length; i++) {
    const row = grid[i];
    const letter = word[i];
    // select a random position in the row
    const position = Math.floor(Math.random() * row.length);
    // insert the letter and shift the rest of the letters to the right
    row.splice(position, 0, letter);
  }

  return {
    grid,
    target: word,
  };
};
