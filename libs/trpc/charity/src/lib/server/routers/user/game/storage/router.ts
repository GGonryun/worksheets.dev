import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  save: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        data: z.any(),
      })
    )
    .output(z.boolean())
    .mutation(async ({ input: { sessionId, data }, ctx: { db, user } }) => {
      const session = await db.gameSession.findUnique({
        where: {
          id: sessionId,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Session not found',
        });
      }

      if (session.userId !== user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Session does not belong to user',
        });
      }

      await db.gameStorage.upsert({
        where: {
          gameId_userId: {
            gameId: session.gameId,
            userId: session.userId,
          },
        },
        create: {
          gameId: session.gameId,
          userId: session.userId,
          data,
        },
        update: {
          data,
        },
      });

      return true;
    }),
  load: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        data: z.any(),
      })
    )
    .output(
      z
        .object({
          storage: z.unknown(),
          lastUpdated: z.number(),
        })
        .nullable()
    )
    .mutation(async ({ input: { sessionId }, ctx: { db, user } }) => {
      const session = await db.gameSession.findUnique({
        where: {
          id: sessionId,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Session not found',
        });
      }

      if (session.userId !== user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Session does not belong to user',
        });
      }

      const storage = await db.gameStorage.findUnique({
        where: {
          gameId_userId: {
            gameId: session.gameId,
            userId: session.userId,
          },
        },
      });

      return storage
        ? { storage: storage.data, lastUpdated: storage.updatedAt.getTime() }
        : null;
    }),
});
