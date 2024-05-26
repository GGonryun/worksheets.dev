import { shuffle } from '@worksheets/util/arrays';

export type RaffleEntry = {
  user: {
    id: string;
    email: string;
  };
  id: number;
  numEntries: number;
};

export const pickWinners = (
  numWinners: number,
  participants: RaffleEntry[]
) => {
  // create an in memory array of entries representing each participant
  const entries: RaffleEntry[] = participants.flatMap((participant) =>
    Array(participant.numEntries).fill(participant)
  );

  console.info('Picking winners from', entries.length, 'entries');

  // shuffle the entries and pick the winners
  const shuffled = shuffle(shuffle(shuffle(entries)));

  // if there are not enough unique participants, do not pick more winners
  const cap = Math.min(numWinners, participants.length);
  const winners: { user: RaffleEntry['user']; participationId: number }[] = [];
  // pick unique winners:
  let i = 0; // don't start from 0 each time, if we have multiple winners they should be unique
  while (winners.length < cap) {
    for (; i < shuffled.length; i++) {
      const entry = shuffled[i];
      if (winners.some((w) => w.user.id === entry.user.id)) {
        continue;
      }
      winners.push({
        user: entry.user,
        participationId: entry.id,
      });
      break;
    }
  }
  return winners;
};
