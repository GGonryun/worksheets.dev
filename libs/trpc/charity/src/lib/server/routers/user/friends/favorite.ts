import { FriendshipService } from '@worksheets/services/friendship';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      // friend object id not a user id.
      friendshipId: z.string(),
    })
  )
  .output(
    z.object({
      newState: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { db, user }, input: { friendshipId: id } }) => {
    const friends = new FriendshipService(db);

    const newState = await friends.favorite(user.id, id);

    return { newState };
  });
