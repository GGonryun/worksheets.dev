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
  .mutation(async ({ ctx: { user, profile, db } }) => {
    console.info('Creating submission for profile', { profileId: profile?.id });

    if (!profile) {
      console.warn('No profile found for user', { userId: user.id });
      throw new TRPCError({
        message: "You don't have a profile yet!",
        code: 'PRECONDITION_FAILED',
      });
    }

    const profileId = profile.id;

    const submission = await db.gameSubmission.create({
      data: {
        profileId,
        status: 'DRAFT',
      },
    });

    console.info('Created submission', submission.id);

    return {
      okay: true,
      id: submission.id,
    };
  });
