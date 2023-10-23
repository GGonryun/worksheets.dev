import { useLocalStorage } from '@worksheets/ui-core';

export const usePlayer = () => {
  const [isNew, setIsNew, loadingIsNew, clearIsNew] = useLocalStorage(
    'is-new',
    false
  );
  const [gamesPlayed, setGamesPlayed, loadingGamesPlayed, clearGamesPlayed] =
    useLocalStorage('games-played', 0);

  return {
    isNew,
    setIsNew,
    gamesPlayed,
    completeGame: () => {
      setGamesPlayed(gamesPlayed + 1);
    },
    clear: () => {
      clearIsNew();
      clearGamesPlayed();
    },
    loading: loadingIsNew || loadingGamesPlayed,
  };
};
