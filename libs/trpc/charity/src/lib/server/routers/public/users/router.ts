import { TRPCError } from '@trpc/server';
import { basicGameInfoSchema } from '@worksheets/util/types';
import { uniqBy } from 'lodash';
import { z } from 'zod';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: publicProcedure
    .output(
      z
        .object({
          id: z.string(),
        })
        .array()
    )
    .query(async ({ ctx: { db } }) => {
      return await db.user.findMany({ select: { id: true } });
    }),
  find: publicProcedure
    .input(z.string())
    .output(
      z.object({
        username: z.string(),
        recentlyPlayed: basicGameInfoSchema.array(),
        mostPlayed: basicGameInfoSchema.array(),
      })
    )
    .query(async ({ ctx: { db }, input }) => {
      const user = await db.user.findFirst({
        where: {
          id: input,
        },
      });

      if (!user || user.banned) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User does not exist',
        });
      }

      const recentlyPlayed = await db.gamePlayHistory.findMany({
        where: {
          userId: user.id,
        },
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          game: true,
        },
      });

      const mostPlayed = await db.gamePlayHistory.groupBy({
        where: {
          userId: user.id,
        },
        by: ['gameId'],
        _count: {
          _all: true,
        },
      });

      const games = await db.game.findMany({
        where: {
          id: {
            in: mostPlayed.map((x) => x.gameId),
          },
        },
      });

      return {
        username: user.username,
        recentlyPlayed: uniqBy(recentlyPlayed, (p) => p.gameId).map((p) => ({
          ...p.game,
          plays: null,
        })),
        mostPlayed: games
          .sort((a, b) => {
            const aCount =
              mostPlayed.find((x) => x.gameId === a.id)?._count?._all ?? 0;
            const bCount =
              mostPlayed.find((x) => x.gameId === b.id)?._count?._all ?? 0;
            return bCount - aCount;
          })
          .map((game) => ({
            ...game,
            plays:
              mostPlayed.find((x) => x.gameId === game.id)?._count?._all ?? 0,
          })),
      };
    }),
});
