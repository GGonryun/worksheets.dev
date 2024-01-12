import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      okay: z.boolean(),
      error: z.string().optional(),
    })
  )
  .mutation(async ({ ctx: { user, db } }) => {
    // check if profile exists
    const profile = await db.profile.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return { okay: false, error: 'Profile not found' };
    }

    // set terms approval on user
    await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        isPublisher: true,
      },
    });

    return { okay: true };
  });
