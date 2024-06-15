import { TRPCError } from '@trpc/server';
import { routes } from '@worksheets/routes';
import { convertReferralCode } from '@worksheets/services/referral';
import { referrerSchema } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';

export default t.router({
  get: protectedProcedure
    .output(referrerSchema.nullable())
    .query(async ({ ctx: { db, user } }) => {
      if (!user.referredByUserId) {
        return null;
      }

      const referrer = await db.user.findFirst({
        where: {
          id: user.referredByUserId,
        },
        select: {
          id: true,
          username: true,
          referralCode: {
            select: {
              code: true,
            },
          },
        },
      });

      if (!referrer) {
        return null;
      }

      if (!referrer.referralCode) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Referrer does not have a referral code',
        });
      }

      return {
        id: referrer.id,
        username: referrer.username,
        code: referrer.referralCode.code,
        link: routes.ref.url({
          params: {
            code: referrer.referralCode.code,
          },
        }),
      };
    }),
  set: protectedProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .output(referrerSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      const referrer = await convertReferralCode({ db, code: input.code });

      if (!referrer) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Referrer does not exist',
        });
      }

      if (referrer.user.id === user.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You cannot refer yourself',
        });
      }
      if (referrer.user.id === user.referredByUserId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You are already referred by this user',
        });
      }

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          referredByUserId: referrer.user.id,
        },
      });
      return {
        id: referrer.user.id,
        username: referrer.user.username,
        code: referrer.code,
        link: routes.ref.url({
          params: {
            code: referrer.code,
          },
        }),
      };
    }),
});
