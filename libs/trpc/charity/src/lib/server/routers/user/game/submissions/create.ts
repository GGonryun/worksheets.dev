import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .output(
    z.object({
      okay: z.boolean(),
      id: z.string(),
    })
  )
  .mutation(async ({ ctx: { user, db } }) => {
    const userId = user.id;
    console.info('Creating submission for user', { userId });

    const submission = await db.gameSubmission.create({
      data: {
        userId,
        status: 'DRAFT',
      },
    });

    console.info('Created submission', submission.id);

    return {
      okay: true,
      id: submission.id,
    };
  });
