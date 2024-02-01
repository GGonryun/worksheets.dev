import { useLocalStorage } from '@worksheets/ui-core';
import { GameVote } from '@worksheets/util/types';

export const useGameVotes = () => {
  const [storage, setStorage] = useLocalStorage<GameVote[]>(
    'use-game-votes',
    []
  );

  const addGameVote = (vote: GameVote) => {
    // check if game is already in the list
    const index = storage.findIndex((r) => r.gameId === vote.gameId);
    if (index !== -1) {
      // if it is, remove it
      storage.splice(index, 1);
    } else {
      // add the vote result to the list.
      storage.push(vote);
    }

    // save our changes
    setStorage(storage);
  };

  const getVote = (id: string) => storage.find((v) => v.gameId === id);

  return {
    votes: storage,
    addGameVote,
    getVote,
  };
};
