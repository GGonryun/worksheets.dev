import { BattleStatus } from '@prisma/client';
import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import { MobsService } from '@worksheets/services/mobs';
import {
  DecrementOpts,
  userBattleParticipationSchema,
} from '@worksheets/util/types';
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
              damage: true,
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
        items: z.array(
          z.object({
            itemId: z.custom<ItemId>(),
            quantity: z.number(),
          })
        ),
      })
    )
    .output(z.number())
    .mutation(async ({ ctx: { db, user }, input: { battleId, items } }) => {
      const userId = user.id;

      return await db.$transaction(async (tx) => {
        const inventory = new InventoryService(tx);
        const mobs = new MobsService(tx);

        const damage = inventory.damage(items);

        await mobs.strike({ userId, battleId, damage });

        for (const item of items) {
          await inventory.decrement(userId, item as DecrementOpts);
        }

        return damage;
      });
    }),
});
