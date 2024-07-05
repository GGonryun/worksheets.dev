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
        achievementIds: z.string().array(),
      })
    )
    .output(
      z.object({
        messages: z.string().array(),
      })
    )
    .mutation(
      async ({ ctx: { db, user }, input: { sessionId, achievementIds } }) => {
        const userId = user.id;
        console.info(`Unlocking achievements for user`, {
          userId,
          achievementIds,
        });
        const session = await db.gameSession.findUnique({
          where: {
            id: sessionId,
            userId,
          },
        });

        if (!session) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Session not found',
            cause: {
              sessionId,
            },
          });
        }

        const messages: string[] = [];
        for (const achievementId of achievementIds) {
          const achievement = await db.gameAchievement.findUnique({
            where: {
              id: achievementId,
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
              cause: achievementId,
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
            continue;
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
              await inventory.increment(
                user.id,
                l.itemId as ItemId,
                l.quantity
              );
            }
          });

          const notifications = new NotificationsService(db);
          await notifications.send('achievement-unlocked', {
            user,
            achievement,
          });

          messages.push(`Achievement "${achievement.name}" unlocked`);
        }

        return {
          messages,
        };
      }
    ),
});
