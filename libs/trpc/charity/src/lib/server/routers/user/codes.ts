import { TRPCError } from '@trpc/server';
import { ItemId } from '@worksheets/data/items';
import { InventoryService } from '@worksheets/services/inventory';
import {
  activationCodeContentSchema,
  activationCodeDetailSchema,
  redemptionCodeSchema,
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
        });

        return codes.map((code) => {
          return {
            id: code.id,
            name: code.name,
            sourceUrl: code.sourceUrl,
            accessedAt: code.accessedAt?.getTime() ?? 0,
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
            accessedAt: true,
            content: true,
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
  redemption: t.router({
    redeem: protectedProcedure
      .input(z.string())
      .output(redemptionCodeSchema)
      .mutation(async ({ ctx: { db, user }, input }) => {
        return await db.$transaction(async (tx) => {
          const inventory = new InventoryService(tx);
          const code = await db.redemptionCode.findFirst({
            where: {
              id: input,
            },
            include: {
              item: true,
            },
          });

          if (!code) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Code not found',
            });
          }

          if (code.userId) {
            throw new TRPCError({
              code: 'FORBIDDEN',
              message: 'Code already redeemed',
            });
          }

          await db.redemptionCode.update({
            where: {
              id: input,
            },
            data: {
              userId: user.id,
            },
          });

          await inventory.increment(
            user.id,
            code.item.id as ItemId,
            code.quantity
          );

          return code;
        });
      }),
  }),
});
