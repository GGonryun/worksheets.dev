import { FriendshipService } from '@worksheets/services/friendship';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      code: z.string(), // referral code
    })
  )
  .output(
    z.object({
      username: z.string(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { code } }) => {
    console.info('checking if username exists', { referralCode: code });
    const friends = new FriendshipService(db);
    const username = await friends.find(user.id, code);

    return {
      username,
    };
  });
