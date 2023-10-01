import { randomizeArray } from '@worksheets/util/arrays';
import { useEffect, useState } from 'react';
import { Puzzle, puzzles } from '../puzzles';

export type UsePuzzleOutput = ReturnType<typeof usePuzzle>;

export const usePuzzle = (id?: number) => {
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState<Puzzle>({
    letters: [],
    words: [],
    bonuses: [],
    rules: [],
  });

  useEffect(() => {
    if (id == null || Number.isNaN(id) || id >= puzzles.length) return;
    setLoading(true);

    const puzzle: Puzzle | undefined = puzzles[id];

    const letters = randomizeArray(puzzle?.letters ?? []);
    setPuzzle({ ...puzzle, letters });

    // wait a bit to show the loading screen, this helps prevent the puzzle layout from registering bad rect positions.
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  const shuffleLetters = () => {
    const newLetters = randomizeArray(puzzle?.letters ?? []);
    setPuzzle((p) => ({ ...p, letters: newLetters }));
  };

  return {
    ...puzzle,
    loading,
    shuffleLetters,
  };
};
