import { TRPCError } from '@trpc/server';
import { basicGameInfoSchema } from '@worksheets/util/types';
import { cloneDeep, groupBy, map, reverse, sortBy, uniqBy } from 'lodash';
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
        code: z.string(),
      })
    )
    .query(async ({ ctx: { db }, input }) => {
      const user = await db.user.findFirst({
        where: {
          id: input,
        },
        include: {
          referralCode: true,
          plays: {
            include: {
              game: true,
            },
          },
        },
      });

      if (!user || user.banned) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User does not exist',
          cause: `User with id ${input} does not exist or is banned`,
        });
      }

      if (!user.referralCode) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'User does not have a referral code',
          cause: `User with id ${input} does not have a referral code`,
        });
      }

      const recentlyPlayed = map(
        reverse(
          sortBy(
            uniqBy(cloneDeep(user.plays), (p) => p.gameId),
            (a) => a.createdAt
          )
        ),
        (p) => ({
          ...p.game,
          plays: null,
        })
      );

      const groups = groupBy(cloneDeep(user.plays), (p) => p.gameId);
      const mostPlayed = map(
        reverse(
          sortBy(
            Object.keys(groups).map((gameId) => ({
              gameId,
              game: groups[gameId][0].game,
              count: groups[gameId].length,
            })),
            (a) => a.count
          )
        ),
        (g) => ({
          ...g.game,
          plays: g.count,
        })
      );

      return {
        username: user.username,
        code: user.referralCode.code,
        recentlyPlayed: recentlyPlayed,
        mostPlayed: mostPlayed,
      };
    }),
});
