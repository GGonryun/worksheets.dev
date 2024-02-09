import { z } from 'zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(z.boolean())
  .query(async ({ ctx: { user, db } }) => {
    const count = await db.notification.count({
      where: {
        userId: user.id,
        read: false,
      },
    });
    return count > 0;
  });
