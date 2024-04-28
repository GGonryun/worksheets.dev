import { TRPCError } from '@trpc/server';
import { mobIdSchema } from '@worksheets/data/mobs';
import { monsterSchema } from '@worksheets/util/types';

import { publicProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  list: publicProcedure
    .output(monsterSchema.array())
    .query(async ({ ctx: { db } }) => {
      const mobs = await db.mob.findMany({
        include: {
          loot: {
            include: {
              item: true,
            },
          },
        },
      });

      return mobs;
    }),

  find: publicProcedure
    .input(mobIdSchema)
    .output(monsterSchema)
    .query(async ({ ctx: { db }, input }) => {
      const mob = await db.mob.findUnique({
        where: {
          id: input,
        },
        include: {
          loot: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!mob) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Monster not found',
        });
      }

      return mob;
    }),
});
