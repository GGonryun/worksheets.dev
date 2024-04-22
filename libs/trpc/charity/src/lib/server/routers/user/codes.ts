import { TRPCError } from '@trpc/server';
import { activationCodeDetails } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  activation: t.router({
    list: protectedProcedure
      .output(z.array(activationCodeDetails))
      .query(async ({ ctx: { db, user } }) => {
        const codes = await db.activationCode.findMany({
          where: {
            userId: user.id,
            accessedAt: {
              not: null,
            },
          },
          select: {
            id: true,
            content: true,
            accessedAt: true,
            item: {
              select: {
                id: true,
                name: true,
                type: true,
                imageUrl: true,
              },
            },
          },
        });

        return codes.map((code) => {
          if (code.item.type !== 'STEAM_KEY') {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Invalid item type',
            });
          }

          return {
            id: code.id,
            content: code.content,
            accessedAt: code.accessedAt?.getTime() ?? 0,
            item: {
              name: code.item.name,
              type: code.item.type,
              imageUrl: code.item.imageUrl,
            },
          };
        });
      }),
  }),
});
