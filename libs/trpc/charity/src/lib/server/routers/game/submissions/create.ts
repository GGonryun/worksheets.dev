import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';
import { TRPCError } from '@trpc/server';

export default protectedProcedure
  .output(
    z.object({
      okay: z.boolean(),
      id: z.string(),
    })
  )
  .mutation(async ({ ctx: { user, db } }) => {
    console.info('Creating submission for user', user.id);

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      throw new TRPCError({
        message: "You don't have a profile yet!",
        code: 'PRECONDITION_FAILED',
      });
    }

    const profileId = profile.id;

    const submission = await db.gameSubmission.create({
      data: {
        profileId,
      },
    });

    console.info('Created submission', submission.id);

    return {
      okay: true,
      id: submission.id,
    };
  });
