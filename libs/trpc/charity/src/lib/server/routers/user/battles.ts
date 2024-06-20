import { BattleStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { startBackgroundJob } from '@worksheets/util/jobs';
import { retryTransaction } from '@worksheets/util/prisma';
import { MAX_ITEMS_PER_STRIKE } from '@worksheets/util/settings';
import {
  calculateCombatDamage,
  isCombatItemId,
  isCurrencyItemId,
  MOB_ELEMENT_RESISTANCES,
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
        items: z.record(z.string(), z.number()),
      })
    )
    .output(z.number())
    .mutation(async ({ ctx: { db, user }, input: { battleId, items } }) => {
      console.info('User is striking a mob', {
        userId: user.id,
        battleId,
        items,
      });
      const userId = user.id;

      if (items.length > MAX_ITEMS_PER_STRIKE) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You can only use ${MAX_ITEMS_PER_STRIKE} unique items per strike.`,
        });
      }

      if (
        !Object.keys(items).every(
          (i) => isCombatItemId(i as ItemId) || isCurrencyItemId(i as ItemId)
        )
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'An invalid item is being used for combat.',
        });
      }

      if (Object.values(items).some((i) => i < 0)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'An invalid quantity was provided.',
        });
      }

      const battle = await db.battle.findFirst({
        where: {
          id: battleId,
          status: 'ACTIVE',
        },
        select: {
          health: true,
          mob: {
            select: {
              id: true,
              name: true,
              maxHp: true,
              element: true,
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

      const resistances = MOB_ELEMENT_RESISTANCES[battle.mob.element];
      const damage = calculateCombatDamage(resistances, items);
      // do not let the damage drop the boss health below 0
      const finalDamage = Math.min(battle.health, damage);

      await retryTransaction(db, async (tx) => {
        console.log('Updating battle health', { battleId, damage });
        await tx.battle.update({
          where: {
            id: battleId,
          },
          data: {
            health: {
              decrement: finalDamage,
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
            damage: finalDamage,
            strikes: 1,
            struckAt: new Date(),
          },
          update: {
            damage: {
              increment: finalDamage,
            },
            strikes: {
              increment: 1,
            },
            struckAt: new Date(),
          },
        });

        for (const [itemId, quantity] of Object.entries(items)) {
          console.log('Updating inventory', { itemId, quantity });
          if (quantity <= 0) return;

          const result = await tx.inventory.update({
            where: {
              itemId_userId: {
                userId,
                itemId,
              },
            },
            data: {
              quantity: {
                decrement: quantity,
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

        return finalDamage;
      });

      await prisma.battleLogs.create({
        data: {
          battleId,
          message: `${user.username} struck the ${battle.mob.name} for ${finalDamage} damage!`,
        },
      });

      startBackgroundJob('battle/participation', {
        userId,
        damage: finalDamage,
      });

      return finalDamage;
    }),
});
