import { BattleStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import { MAX_ITEMS_PER_STRIKE } from '@worksheets/util/settings';
import {
  isCombatItemId,
  isCurrencyItemId,
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

      if (items.length > MAX_ITEMS_PER_STRIKE) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You can only use ${MAX_ITEMS_PER_STRIKE} unique items per strike.`,
        });
      }

      if (
        !items.every(
          (i) => isCombatItemId(i.itemId) || isCurrencyItemId(i.itemId)
        )
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'An invalid item is being used for combat.',
        });
      }

      if (items.some((i) => i.quantity < 0)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'An invalid quantity was provided.',
        });
      }

      return await db.$transaction(async (tx) => {
        const inventory = new InventoryService(tx);

        const damage = inventory.damage(items);

        const battle = await tx.battle.findFirst({
          where: {
            id: battleId,
            status: 'ACTIVE',
          },
          select: {
            health: true,
            mob: {
              select: {
                id: true,
                maxHp: true,
              },
            },
          },
        });

        if (!battle) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Battle not found',
          });
        }

        // check if the mob already has 0 hp.
        if (battle.health <= 0) {
          throw new TRPCError({
            code: 'PRECONDITION_FAILED',
            message: 'Mob already defeated',
          });
        }

        // check how much damage could actually be dealt dealt.
        const damageDealt = Math.min(battle.health, damage);

        await tx.battle.update({
          where: {
            id: battleId,
          },
          data: {
            health: {
              decrement: damageDealt,
            },
          },
        });

        await tx.battleParticipation.upsert({
          where: {
            userId_battleId: {
              userId,
              battleId,
            },
          },
          create: {
            battleId,
            userId,
            damage,
            strikes: 1,
            struckAt: new Date(),
          },
          update: {
            damage: {
              increment: damageDealt,
            },
            strikes: {
              increment: 1,
            },
            struckAt: new Date(),
          },
        });

        for (const item of items) {
          const result = await tx.inventory.update({
            where: {
              itemId_userId: {
                userId,
                itemId: item.itemId,
              },
            },
            data: {
              quantity: {
                decrement: item.quantity,
              },
            },
          });

          if (result.quantity < 0) {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: 'Not enough items to use',
            });
          }
        }

        return damage;
      });
    }),
});
