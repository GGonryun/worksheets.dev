import { useLocalStorage } from '@worksheets/ui-core';

export const usePlayer = () => {
  const [isNew, setIsNew, loadingNew, clearNew] = useLocalStorage(
    'first-time',
    true
  );

  const [words, setWords, loadingWords, clearWords] = useLocalStorage<
    Record<string, number>
  >('words', {});

  return {
    loading: loadingNew || loadingWords,
    isNew,
    words,
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
