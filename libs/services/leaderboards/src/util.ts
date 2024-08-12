import { TRPCError } from '@trpc/server';
import { assertNever } from '@worksheets/util/errors';
import { LeaderboardFrequency } from '@worksheets/util/types';

export const getPayoutDates = (
  frequency: LeaderboardFrequency,
  now: Date = new Date()
) => {
  if (frequency === 'WEEKLY') {
    // Find the Sunday of the week before the last
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 7) % 7) - 7);

    // Find the Saturday of the week before the last
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 6);

    // Set the times to the beginning and end of the days in UTC
    const starting = new Date(
      Date.UTC(
        start.getUTCFullYear(),
        start.getUTCMonth(),
        start.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );
    const ending = new Date(
      Date.UTC(
        end.getUTCFullYear(),
        end.getUTCMonth(),
        end.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    return { starting, ending };
  }

  if (frequency === 'ALL_TIME') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Cannot get payout dates for all time leaderboards',
    });
  }

  throw assertNever(frequency);
};
