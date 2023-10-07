import { useLocalStorage } from '@worksheets/ui-core';
import { createMap } from '@worksheets/util/arrays';
import { puzzles } from '../puzzles';
import { Pair } from '../types';
import { createPuzzle } from '../util';

export const usePuzzle = () => {
  const [water, setWater, loadingWater, clearWater] = useLocalStorage<number>(
    'water',
    0
  );
  const [level, setLevel, loadingLevel, clearLevel] = useLocalStorage<number>(
    'level',
    -1
  );
  const [words, setWords, loadingWords, clearWords] = useLocalStorage<string[]>(
    'words',
    []
  );
  const [size, setSize, loadingSize, clearSize] = useLocalStorage<{
    rows: number;
    columns: number;
  }>('size', { rows: 0, columns: 0 });
  const [letters, setLetters, loadingLetters, clearLetters] = useLocalStorage<
    string[]
  >('puzzle', []);
  const [matches, setMatches, loadingMatches, clearMatches] = useLocalStorage<
    Record<string, number>
  >('matches', {});
  const [lines, setLines, loadingLines, clearLines] = useLocalStorage<Pair[]>(
    'pairs',
    []
  );

  const isComplete =
    Object.values(matches).filter((m) => m).length === words.length;

  const isGameOver = level === puzzles.length - 1 && isComplete;

  const onMatch = (word: string, line: Pair) => {
    setMatches({
      ...matches,
      [word]: Object.values(matches).filter((m) => m).length + 1,
    });
    setLines([...lines, line]);
    setWater(water + 1);
  };

  const load = (level: number) => {
    const { words, rows, columns } = puzzles[level];
    const letters = createPuzzle(words, rows, columns);
    setLevel(level);
    setWords(words);
    setSize({ rows, columns });
    setLetters(letters);
    setLines([]);
    setMatches(createMap(words, 0));
  };

  const loadNext = () => {
    if (isGameOver) return;
    load(level + 1);
  };

  const reset = () => {
    clearWater();
    clearLevel();
    clearWords();
    clearSize();
    clearLetters();
    clearMatches();
    clearLines();
  };

  const loading = [
    loadingWater,
    loadingLevel,
    loadingWords,
    loadingSize,
    loadingLetters,
    loadingMatches,
    loadingLines,
  ].some((l) => l);
  return {
    loadNext,
    load,
    reset,
    words,
    water,
    rows: size.rows,
    columns: size.columns,
    level,
    letters,
    loading,
    matches,
    lines,
    isComplete,
    isGameOver,
    onMatch,
  };
};
