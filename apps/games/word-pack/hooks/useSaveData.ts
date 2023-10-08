import { useLocalStorage } from '@worksheets/ui-core';
import { generatePuzzle, serializePuzzle } from '../util';
import { puzzles } from '../puzzles';

export const useSavedSelections = () => {
  const [selections, setSelections, loadingSelections, clearSelections] =
    useLocalStorage<string[][]>('selections', [[]]);

  const isEmpty = () => {
    return selections.length === 1 && selections[0].length === 0;
  };

  return {
    selections,
    loadingSelections,
    isEmpty,
    clearSelections,
    setSelections,
  };
};
export const useSavedPuzzle = () => {
  const [level, setLevel, loadingLevel, clearLevel] = useLocalStorage(
    'level',
    -1
  );
  const [water, setWater, loadingWater, clearWater] = useLocalStorage(
    'water',
    0
  );
  const [puzzle, setPuzzle, loadingPuzzle, clearPuzzle] = useLocalStorage(
    'puzzle',
    ''
  );

  const [complete, setComplete, loadingComplete, clearComplete] =
    useLocalStorage('complete', false);

  const cacheLevel = (level: number) => {
    if (level < 0) throw Error('Level must be greater than 0');
    const p = puzzles[level];
    // if the puzzle was pregenerated, use that instead.
    // some puzzles are too large to generate on the fly.
    let serialized = p.puzzle;

    if (!serialized) {
      const grid = generatePuzzle(level, p);
      serialized = serializePuzzle(grid);
    }
    setLevel(level);
    setPuzzle(serialized);
    setComplete(false);
  };

  const cacheNextLevel = () => {
    cacheLevel(level + 1);
  };

  const updateWater = (add: number) => {
    setWater(water + add);
  };

  const clear = () => {
    clearLevel();
    clearWater();
    clearPuzzle();
    clearComplete();
  };

  const completeLevel = (state: boolean) => {
    setComplete(state);
  };

  const loading =
    loadingLevel || loadingWater || loadingPuzzle || loadingComplete;
  const maxLevel = puzzles.length - 1;
  const labels = puzzles.map((p, id) => ({ id, label: p.title }));

  return {
    level,
    labels,
    water,
    puzzle,
    loading,
    complete,
    maxLevel,
    clear,
    cacheLevel,
    cacheNextLevel,
    updateWater,
    completeLevel,
  };
};
