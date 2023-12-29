import { useLocalStorageAlt } from '@worksheets/ui-core';
import { UserVoteSchema } from '@worksheets/util/types';

export const useVoteHistory = () => {
  const [storage, setStorage] = useLocalStorageAlt<UserVoteSchema[]>(
    'game-vote-history',
    []
  );

  // responds with true if the vote was added or changed, false if it was removed
  const addToVoteHistory = (vote: UserVoteSchema) => {
    // check if game is already in the list
    const index = storage.findIndex((target) => target.gameId === vote.gameId);
    const existing = storage.find((target) => target.gameId === vote.gameId);
    if (index !== -1) {
      // if it is, remove it
      storage.splice(index, 1);
    }
    // if the vote is the same as the existing vote, we meant to remove it.
    let promptForUpdate;
    if (existing?.vote === vote.vote) {
      promptForUpdate = false;
    } else {
      promptForUpdate = true;
      // add the vote to the list
      storage.push(vote);
    }

    // save the list
    setStorage(storage);

    return promptForUpdate;
  };

  const getVote = (gameId: string): UserVoteSchema['vote'] | undefined => {
    return storage.find((target) => target.gameId === gameId)?.vote;
  };

  return { getVote, addToVoteHistory };
};
