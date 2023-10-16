import { useLocalStorage } from '@worksheets/ui-core';
import { listPuzzles } from '../puzzles';

export const usePlayer = () => {
  const [isNew, setIsNew, loadingIsNew, clearIsNew] = useLocalStorage(
    'is-new',
    true
  );
  const [completed, setCompleted, loadingCompleted, clearCompleted] =
    useLocalStorage<string[]>('completed', []);
  const gameOver = completed.length === listPuzzles().length;

  return {
    isNew,
    completed,
    loading: loadingIsNew || loadingCompleted,
    setIsNew,
    gameOver,
    setLevelComplete: (levelId: string) => {
      if (completed.includes(levelId)) return;
      setCompleted([...completed, levelId]);
    },
    restartLevel: (levelId: string) => {
      setCompleted(completed.filter((id) => id !== levelId));
    },
    clear: () => {
      clearIsNew();
      clearCompleted();
    },
  };
};

export type PlayerStorage = ReturnType<typeof usePlayer>;
