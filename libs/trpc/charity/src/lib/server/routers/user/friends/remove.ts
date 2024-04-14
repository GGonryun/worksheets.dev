import { FriendshipService } from '@worksheets/services/friendship';
import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      // id of the friend object, not a user id.
      friendshipId: z.string(),
    })
  )

  .mutation(async ({ ctx: { db, user }, input: { friendshipId: id } }) => {
    const friends = new FriendshipService(db);

    await friends.remove(user.id, id);
  });
