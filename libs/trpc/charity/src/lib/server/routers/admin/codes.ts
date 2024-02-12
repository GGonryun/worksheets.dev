import { TRPCError } from '@trpc/server';
import {
  activationCodeDetails,
  activationCodeSummary,
} from '@worksheets/util/types';
import { z } from 'zod';

import { adminProcedure } from '../../procedures';
import { t } from '../../trpc';

export default t.router({
  find: adminProcedure
    .input(
      z.object({
        codeId: z.string(),
      })
    )
    .output(activationCodeDetails)
    .query(async ({ input: { codeId }, ctx: { db } }) => {
      const code = await db.activationCode.findUnique({
        where: {
          id: codeId,
        },
        select: {
          id: true,
          prizeId: true,
          raffleId: true,
          createdAt: true,
          updatedAt: true,
          winner: {
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

      return {
        codeId: code.id,
        prizeId: code.prizeId,
        raffleId: code.raffleId,
        winnerId: code.winner?.id ?? null,
        createdAt: code.createdAt.getTime(),
        updatedAt: code.updatedAt.getTime(),
      };
    }),

  list: adminProcedure
    .input(
      z.object({
        take: z.number(),
        skip: z.number(),
      })
    )
    .output(activationCodeSummary.array())
    .query(async ({ input: { take, skip }, ctx: { db } }) => {
      const codes = await db.activationCode.findMany({
        take,
        skip,
        select: {
          id: true,
          createdAt: true,
          winner: {
            select: {
              id: true,
            },
          },
        },
      });

      return codes.map((code) => ({
        codeId: code.id,
        createdAt: code.createdAt.getTime(),
        winner: Boolean(code.winner),
      }));
    }),
});
