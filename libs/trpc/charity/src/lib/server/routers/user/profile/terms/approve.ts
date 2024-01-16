import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ ctx: { user, db } }) => {
    const userId = user.id;
    console.info("Approving user's terms", user.id);
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isPublisher: true,
      },
    });

    console.info("User's terms have been approved", user.id);
    return {
      okay: true,
    };
  });
