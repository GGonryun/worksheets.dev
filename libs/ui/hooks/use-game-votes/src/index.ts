import { useLocalStorage } from '@worksheets/ui-core';
import { CastVote } from '@worksheets/util/types';

export const useGameVotes = () => {
  const [storage, setStorage] = useLocalStorage<CastVote[]>(
    'use-game-votes',
    []
  );

  const addGameVote = (vote: CastVote) => {
    // check if game is already in the list
    const index = storage.findIndex((r) => r.gameId === vote.gameId);
    if (index !== -1) {
      // if the vote is the same, we're removing it.
      if (storage[index].vote === vote.vote) {
        storage.splice(index, 1);
      } else {
        // if the vote is different, we're changing it.
        storage[index] = vote;
      }
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
