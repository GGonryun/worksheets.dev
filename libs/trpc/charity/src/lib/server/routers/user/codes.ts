import { TRPCError } from '@trpc/server';
import {
  activationCodeContentSchema,
  activationCodeDetailSchema,
} from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  activation: t.router({
    list: protectedProcedure
      .output(z.array(activationCodeDetailSchema))
      .query(async ({ ctx: { db, user } }) => {
        const codes = await db.activationCode.findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            accessedAt: 'desc',
          },
          include: {
            expiration: true,
          },
        });

        return codes.map((code) => {
          return {
            id: code.id,
            name: code.name,
            sourceUrl: code.sourceUrl,
            accessedAt: code.accessedAt?.getTime() ?? 0,
            expiresAt: code.expiration?.expiresAt.getTime() ?? null,
            type: code.type,
            imageUrl: code.imageUrl,
          };
        });
      }),
    access: protectedProcedure
      .input(z.string())
      .output(activationCodeContentSchema)
      .mutation(async ({ ctx: { db, user }, input }) => {
        const code = await db.activationCode.findUnique({
          where: {
            id: input,
            userId: user.id,
          },
          select: {
            id: true,
            userId: true,
            content: true,
            expiration: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!code) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Code not found',
          });
        }

        if (code.userId !== user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Code does not belong to user',
          });
        }

        if (code.expiration) {
          await db.expiration.delete({
            where: {
              id: code.expiration.id,
            },
          });
        }

        await db.activationCode.update({
          where: {
            id: input,
          },
          data: {
            accessedAt: new Date(),
          },
        });

        return {
          id: code.id,
          content: code.content,
        };
      }),
  }),
});
