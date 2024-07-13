import { z } from 'zod';

import { ValidationOptions } from './task';

const leaderboardScoreDataSchema = z.object({
  score: z.number(),
});

export type LeaderboardScoreData = z.infer<typeof leaderboardScoreDataSchema>;

export const validateLeaderboardScore = (opts: ValidationOptions) => {
  const data = parseData(opts.data);
  const state = parseData(opts.state);
  if (state.score >= data.score) {
    return { state: opts.state, skip: false };
  }
  return { skip: true, state: undefined };
};

const parseData = (data: unknown): LeaderboardScoreData => {
  const parsed = leaderboardScoreDataSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data');
  }
  return parsed.data;
};
