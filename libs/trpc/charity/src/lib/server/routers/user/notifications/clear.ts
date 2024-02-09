import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      ids: z.string().array(),
    })
  )
  .output(z.boolean())
  .mutation(async ({ ctx: { user, db }, input: { ids } }) => {
    await db.notification.deleteMany({
      where: {
        userId: user.id,
        id: {
          in: ids,
        },
      },
    });

    return true;
  });
