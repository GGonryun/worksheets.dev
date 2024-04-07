import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';
import { t } from '../../../trpc';
import clear from './clear';
import hasAny from './hasAny';
import list from './list';

export default t.router({
  list,
  hasAny,
  clear,
  count: protectedProcedure
    .input(
      z.object({
        unread: z.boolean().optional(),
      })
    )
    .output(z.number())
    .query(async ({ input: { unread }, ctx: { db, user } }) => {
      const count = await db.notification.count({
        where: {
          userId: user.id,
          read: unread ? false : undefined,
        },
      });

      return count;
    }),
});
