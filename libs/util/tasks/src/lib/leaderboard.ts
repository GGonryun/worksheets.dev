import { LeaderboardType } from '@worksheets/prisma';
import { assertNever } from '@worksheets/util/errors';
import { z } from 'zod';

import { ValidationOptions } from './task';

const leaderboardStateSchema = z.object({
  score: z.number(),
});
const leaderboardDataSchema = leaderboardStateSchema.extend({
  order: z.nativeEnum(LeaderboardType),
});

type LeaderboardState = z.infer<typeof leaderboardStateSchema>;
type LeaderboardData = z.infer<typeof leaderboardDataSchema>;

export const validateLeaderboardScore = (opts: ValidationOptions) => {
  const data = parseData(opts.data);
  const state = parseState(opts.state);
  if (meetsCondition(state, data)) {
    return { state: opts.state, skip: false };
  }
  return { skip: true, state: undefined };
};

const parseState = (data: unknown): LeaderboardState => {
  const parsed = leaderboardStateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data');
  }
  return parsed.data;
};

const parseData = (data: unknown): LeaderboardData => {
  const parsed = leaderboardDataSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data');
  }
  return parsed.data;
};

const meetsCondition = (state: LeaderboardState, data: LeaderboardData) => {
  switch (data.order) {
    case 'LOW':
      return state.score <= data.score;
    case 'NONE':
    case 'HIGH':
      return state.score >= data.score;
    default:
      throw assertNever(data.order);
  }
};
