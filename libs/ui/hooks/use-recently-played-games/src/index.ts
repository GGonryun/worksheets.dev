import { games } from '@worksheets/data-access/charity-games';
import { useLocalStorage } from '@worksheets/ui-core';
import { strict } from '@worksheets/util/misc';
import { GameIcon, RecentlyPlayedSchema } from '@worksheets/util/types';

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

  return { recentlyPlayed: convertGames(storage), addRecentlyPlayed };
};

const convertGames = (recent: RecentlyPlayedSchema[]): GameIcon[] => {
  return recent
    .map((r) => {
      const game = strict(
        games.find((game) => game.id === r.gameId),
        `Game ${r.gameId} not found`
      );
      return game;
    })
    .map((game) => ({
      id: game.id,
      name: game.name,
      imageUrl: game.iconUrl,
    }));
};
