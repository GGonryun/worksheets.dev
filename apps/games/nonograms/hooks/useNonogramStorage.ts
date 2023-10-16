import { useLocalStorage } from '@worksheets/ui-core';
import { NonogramSelections } from '../util/types';
import { generateNonogram } from '@worksheets/ui-games';
import { findPuzzle } from '../puzzles';

export const useNonogramStorage = (id: string) => {
  const [allSelections, setAllSelections, loading, clearAllSelections] =
    useLocalStorage<Record<string, NonogramSelections | undefined>>(
      'nonograms',
      {}
    );

  const puzzle = findPuzzle(id);
  const nonogram = generateNonogram(puzzle.grid);

  return {
    puzzle,
    nonogram,
    selections: allSelections[id],
    loading,
    clear: () => {
      clearAllSelections();
    },
    setSelections: (selections: NonogramSelections) => {
      setAllSelections({
        ...allSelections,
        [id]: selections,
      });
    },
  };
};

export type NonogramStorage = ReturnType<typeof useNonogramStorage>;
