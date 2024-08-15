import { BattleStatus } from '@prisma/client';
import { MobsService } from '@worksheets/services/mobs';
import { retryTransaction } from '@worksheets/util/prisma';
import { userBattleParticipationSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  participation: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(BattleStatus).array(),
      })
    )
    .output(userBattleParticipationSchema.array())
    .query(async ({ ctx: { db, user }, input: { status } }) => {
      const participation = await db.battleParticipation.findMany({
        where: {
          userId: user.id,
          battle: {
            status: {
              in: status,
            },
          },
        },
        select: {
          id: true,
          updatedAt: true,
          damage: true,
          strikes: true,
          battle: {
            select: {
              id: true,
              status: true,
              health: true,
              mob: {
                select: {
                  maxHp: true,
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return participation.map((p) => ({
        ...p,
        updatedAt: p.updatedAt.getTime(),
      }));
    }),
  strike: protectedProcedure
    .input(
      z.object({
        battleId: z.number(),
        items: z.record(z.string(), z.number()),
      })
    )
    .output(z.string())
    .mutation(
      async ({ ctx: { db, user }, input }) =>
        await retryTransaction(db, async (tx) =>
          new MobsService(tx).strike({ user, ...input })
        )
    ),
});
