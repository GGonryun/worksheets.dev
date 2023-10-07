import { puzzles } from '.';
import { createPuzzle } from '../util';

export const verifier = () => {
  puzzles.forEach((puzzle, index) => {
    // puzzle must have at least one word
    if (puzzle.words.length === 0) {
      throw new Error(`Puzzle ${index} has no words`);
    }
    // make sure each puzzle has no word longer than the number of columns or rows
    puzzle.words.forEach((word) => {
      if (word.length > puzzle.columns || word.length > puzzle.rows) {
        throw new Error(
          `Puzzle ${index} has word ${word} is longer than the puzzle`
        );
      }
    });
    // make sure each puzzle has no duplicate words
    const uniqueWords = new Set(puzzle.words);
    if (uniqueWords.size !== puzzle.words.length) {
      throw new Error(`Puzzle ${index} has duplicate words`);
    }

    // puzzle must not be overly complex
    try {
      const grid = createPuzzle(puzzle.words, puzzle.columns, puzzle.rows);
      if (!grid)
        throw new Error(
          `Puzzle ${index} was too complex. Failed to create puzzle.`
        );
    } catch (error) {
      throw new Error(
        `Puzzle ${index} was too complex. Failed to create puzzle.`
      );
    }
  });

  console.info('puzzles are valid');
};
