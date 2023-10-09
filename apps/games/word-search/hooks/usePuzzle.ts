import { useLocalStorage } from '@worksheets/ui-core';
import { createMap } from '@worksheets/util/arrays';
import { puzzles } from '../puzzles';
import { createPuzzle } from '../util';
import { Pair } from '@worksheets/ui-games';

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
  const [size, setSize, loadingSize, clearSize] = useLocalStorage<number>(
    'size',
    0
  );
  const [letters, setLetters, loadingLetters, clearLetters] = useLocalStorage<
    string[]
  >('puzzle', []);
  const [matches, setMatches, loadingMatches, clearMatches] = useLocalStorage<
    Record<string, number>
  >('matches', {});
  const [discoveries, setDiscoveries, loadingDiscoveries, clearDiscoveries] =
    useLocalStorage<Record<string, number>>('discoveries', {});
  // bonus matches are considered discoveries.
  const [lines, setLines, loadingLines, clearLines] = useLocalStorage<Pair[]>(
    'pairs',
    []
  );

  const isComplete = words.every((word) => matches[word] > 0);

  const isGameOver = level === puzzles.length - 1 && isComplete;

  const onMatch = (word: string, line: Pair) => {
    setMatches({
      ...matches,
      [word]: Object.values(matches).filter((m) => m).length + 1,
    });
    setLines([...lines, line]);
    setWater(water + 1);
  };

  const onDiscovery = (word: string, line: Pair) => {
    setDiscoveries({
      ...discoveries,
      [word]: Object.values(discoveries).filter((m) => m).length + 1,
    });
    setLines([...lines, line]);
    setWater(water + 1);
  };

  const load = (level: number) => {
    const { words, size } = puzzles[level];
    const letters = createPuzzle(words, size, size);
    setLevel(level);
    setWords(words);
    setSize(size);
    setLetters(letters);
    setLines([]);
    setMatches(createMap(words, 0));
    setDiscoveries({});
  };

  const reload = () => {
    load(level);
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
    clearDiscoveries();
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
    loadingDiscoveries,
  ].some((l) => l);

  return {
    loadNext,
    load,
    reload,
    reset,
    words,
    water,
    size,
    level,
    letters,
    loading,
    matches,
    discoveries,
    lines,
    isComplete,
    isGameOver,
    onMatch,
    onDiscovery,
  };
};
