import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure.mutation(async ({ ctx: { user, db } }) => {
  const userId = user?.id;
  console.info('Creating a referral code for user', { userId });

  const exists = await db.referralCode.findFirst({
    where: {
      userId,
    },
  });

  if (exists) {
    console.warn('User already has a referral code', {
      userId,
      referralCodeId: exists.id,
    });
    return;
  }

  const code = await generateReferralCode(db);

  await db.referralCode.create({
    data: {
      userId,
      code,
    },
  });
});

const MAX_ATTEMPTS = 10;

const generateReferralCode = async (db: PrismaClient): Promise<string> => {
  let attempts = 10;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const code = Math.random().toString(36).substring(2, 8);

    console.log(`new referral code created`, code);

    // check if the code already exists
    const exists = await db.referralCode.findFirst({
      where: {
        code,
      },
    });

    if (!exists) {
      return code;
    }

    attempts--;
    console.info(
      `failed to generate a short referral code, trying again`,
      attempts
    );
  }
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Failed to generate referral code',
  });
};
