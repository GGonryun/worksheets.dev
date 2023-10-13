import { useLocalStorage } from '@worksheets/ui-core';
import { WATER_OFFSET } from '../util';

export const usePlayer = () => {
  const [isNew, setIsNew, loadingNew, clearNew] = useLocalStorage(
    'first-time',
    true
  );

  const [words, setWords, loadingWords, clearWords] = useLocalStorage<
    Record<string, number>
  >('words', {});

  const water = Object.entries(words)
    // multiply the length of the word by the number of times it was used
    // but reduce the length so that the player doesn't get a ton of water
    .map(([word, instances]) => (word.length - WATER_OFFSET) * instances)
    .reduce((a, b) => a + b, 0);

  return {
    loading: loadingNew || loadingWords,
    isNew,
    words,
    water,
    saveWord: (word: string) => {
      setWords({ ...words, [word]: (words[word] || 0) + 1 });
    },
    setIsNew,
    clear: () => {
      clearNew();
      clearWords();
    },
  };
};
