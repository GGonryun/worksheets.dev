import { useLocalStorage } from '@worksheets/ui-core';
import { RecentlyPlayedSchema } from '@worksheets/util/types';

export const useRecentlyPlayedGames = () => {
  const [storage, setStorage] = useLocalStorage<RecentlyPlayedSchema[]>(
    'recently-played-games',
    []
  );

  const addRecentlyPlayed = (game: RecentlyPlayedSchema) => {
    // check if game is already in the list
    const index = storage.findIndex((r) => r.gameId === game.gameId);
    if (index !== -1) {
      // if it is, remove it
      storage.splice(index, 1);
    }
    // add the game to the front of the list
    storage.unshift(game);
    // keep the list to 10 items
    if (storage.length > 10) {
      storage.pop();
    }
    // save the list
    setStorage(storage);
    // update the state
  };

  return { recentlyPlayed: storage, addRecentlyPlayed };
};
