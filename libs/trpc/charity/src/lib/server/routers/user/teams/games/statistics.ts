import { Prisma } from '@prisma/client';
import { daysAgo } from '@worksheets/util/time';
import { z } from 'zod';

import { protectedTeamProcedure } from '../../../../procedures';

const reportSchema = z.object({
  name: z.string(),
  plays: z.number(),
  time: z.number(),
});

export type ReportSchema = z.infer<typeof reportSchema>;

export default protectedTeamProcedure
  .output(
    z.object({
      hasGames: z.boolean(),
      analytics: z.array(reportSchema),
    })
  )
  .query(async ({ ctx: { db, team } }) => {
    const analytics = await db.gamePlayAnalytics.findMany({
      where: {
        game: {
          teamId: team.id,
        },
      },
      include: {
        game: true,
      },
    });

    const games = await db.game.count({
      where: {
        teamId: team.id,
      },
    });

    return {
      hasGames: games > 0,
      analytics: groupDaily(analytics),
    };
  });

const groupDaily = (
  analytics: Prisma.GamePlayAnalyticsGetPayload<{
    include: {
      game: true;
    };
  }>[]
): ReportSchema[] => {
  const getMidnight = (date: Date) => {
    const utcDate = new Date(date);
    utcDate.setUTCHours(0, 0, 0, 0);
    return utcDate;
  };
  // create buckets for the last 30 days.
  const length = 30;
  const buckets = Array.from({ length }).map((_, index) => ({
    date: getMidnight(daysAgo(length - index)),
    plays: 0,
    time: 0,
  }));
  const grouped = analytics.reduce((acc, curr) => {
    const date = new Date(curr.date);
    const bucket = acc.find(
      (b) => b.date.toDateString() === date.toDateString()
    );
    if (bucket) {
      bucket.plays += curr.plays;
      bucket.time += curr.duration;
    }
    return acc;
  }, buckets);
  return grouped.map((b) => ({
    name: b.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    plays: b.plays,
    time: b.time,
  }));
};
