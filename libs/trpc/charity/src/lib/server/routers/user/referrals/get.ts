import { TRPCError } from '@trpc/server';
import { routes } from '@worksheets/routes';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      referrals: z.array(
        z.object({
          id: z.string(),
          username: z.string().nullable(),
          createdAt: z.number(),
        })
      ),
      numReferrals: z.number(),
      referralLink: z.string(),
    })
  )
  .query(async ({ ctx: { db, user } }) => {
    const userId = user.id;

    const userData = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        referred: true,
        referralCode: true,
      },
    });

    if (!userData || !userData.referralCode) {
      console.error('Referrals for user were not found', { userId });
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'Referrals information was not found. Try again. If the problem persists, contact support.',
      });
    }

    return {
      referrals: userData.referred.map((referral) => ({
        id: referral.id,
        username: referral.username,
        createdAt: referral.createdAt.getTime(),
      })),
      numReferrals: userData.referred.length,
      referralLink: routes.ref.url({
        params: { code: userData.referralCode.code },
      }),
    };
  });
