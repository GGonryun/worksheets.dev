import { assertNever } from '@worksheets/util/errors';
import { lastSundayUtcMidnight, lastUtcMidnight } from '@worksheets/util/time';
import { z } from 'zod';

export const LEADERBOARD_LIMIT = 16;

export const LEADERBOARD_FREQUENCY = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  ALL_TIME: 'ALL_TIME',
} as const;

export const LEADERBOARD_FREQUENCY_LABELS: Record<
  LeaderboardFrequency,
  string
> = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  ALL_TIME: 'All Time',
};

export const leaderboardFrequency = z.nativeEnum(LEADERBOARD_FREQUENCY);

export type LeaderboardFrequency = keyof typeof LEADERBOARD_FREQUENCY;

export const LEADERBOARD_REWARD_PAYOUT: Record<LeaderboardFrequency, number[]> =
  {
    DAILY: [50, 25, 10],
    WEEKLY: [200, 100, 75, 75, 50, 50, 20, 20],
    ALL_TIME: [],
  };

export const leaderboardPlayerSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
  }),
  score: z.number(),
  rank: z.number(),
});

export type LeaderboardPlayerSchema = z.infer<typeof leaderboardPlayerSchema>;

export const getLeaderboardFrequencyDate = (
  frequency: LeaderboardFrequency
): Date => {
  if (frequency === 'DAILY') {
    return lastUtcMidnight();
  }

  if (frequency === 'WEEKLY') {
    return lastSundayUtcMidnight();
  }

  if (frequency === 'ALL_TIME') {
    return new Date(0);
  }

  throw assertNever(frequency);
};
