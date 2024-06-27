import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import { NotificationsService } from '@worksheets/services/notifications';
import { retryTransaction } from '@worksheets/util/prisma';
import { playerGameAchievementSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  list: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .output(playerGameAchievementSchema.array())
    .query(async ({ ctx: { db, user }, input }) => {
      const achievements = await db.playerAchievement.findMany({
        where: {
          achievement: {
            gameId: input.gameId,
          },
          userId: user.id,
        },
      });

      return achievements.map((achievement) => ({
        achievementId: achievement.achievementId,
        unlockedAt: achievement.createdAt.getTime(),
      }));
    }),
  load: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .output(
      z.object({
        achievements: z
          .string()
          .describe('Achievement ID')
          .array()
          .describe('List of unlocked achievements'),
      })
    )
    .mutation(async ({ ctx: { db, user }, input }) => {
      console.info(`Loading achievements for user "${user.id}"`);
      const session = await db.gameSession.findUnique({
        where: {
          id: input.sessionId,
          userId: user.id,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Session not found',
          cause: input,
        });
      }

      const achievements = await db.gameAchievement.findMany({
        where: {
          gameId: session.gameId,
          players: {
            some: {
              userId: session.userId,
            },
          },
        },
      });
      const ids = achievements.map((achievement) => achievement.id);
      console.info(`Found ${achievements.length} achievements`, ids);

      return {
        achievements: ids,
      };
    }),
  unlock: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        achievementId: z.string(),
      })
    )
    .output(
      z.union([
        z.object({
          unlocked: z.literal(true),
          message: z.string(),
        }),
        z.object({
          unlocked: z.literal(false),
        }),
      ])
    )
    .mutation(async ({ ctx: { db, user }, input }) => {
      const userId = user.id;
      console.info(
        `Unlocking achievement "${input.achievementId}" for user "${userId}"`
      );
      const session = await db.gameSession.findUnique({
        where: {
          id: input.sessionId,
          userId,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Session not found',
          cause: input,
        });
      }

      const achievement = await db.gameAchievement.findUnique({
        where: {
          id: input.achievementId,
          gameId: session.gameId,
        },
        include: {
          game: true,
          loot: {
            include: {
              item: true,
            },
          },
        },
      });

      if (!achievement) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Achievement not found',
          cause: input,
        });
      }

      const playerAchievement = await db.playerAchievement.findFirst({
        where: {
          userId: session.userId,
          achievementId: achievement.id,
        },
      });

      if (playerAchievement) {
        console.info(`Achievement "${achievement.name}" already unlocked`);
        return {
          unlocked: false,
        };
      }

      await retryTransaction(db, async (tx) => {
        const inventory = new InventoryService(tx);
        await tx.playerAchievement.create({
          data: {
            userId: session.userId,
            achievementId: achievement.id,
          },
        });
        console.info(`Awarding loot for achievement "${achievement.name}"`);
        for (const l of achievement.loot) {
          // TODO: all achievement loots should have a guaranteed drop rate.
          await inventory.increment(user.id, l.itemId as ItemId, l.quantity);
        }
      });

      const notifications = new NotificationsService(db);
      await notifications.send('achievement-unlocked', {
        user,
        achievement,
      });

      return {
        unlocked: true,
        message: `Achievement "${achievement.name}" unlocked!`,
      };
    }),
});
