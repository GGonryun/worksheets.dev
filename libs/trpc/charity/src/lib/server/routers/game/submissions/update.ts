import { protectedProcedure } from '../../../procedures';
import { TRPCError } from '@trpc/server';
import { GameSubmissionForm } from '@worksheets/ui/pages/game-submissions';
import { Nullable } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

export default protectedProcedure
  // removes form validation on server side
  .input(z.custom<Nullable<GameSubmissionForm> & { id: string }>())
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input, ctx: { user, profile, db } }) => {
    console.info('Updating submission', {
      id: input.id,
      profileId: profile?.id,
      userId: user.id,
    });

    if (!profile) {
      throw new TRPCError({
        message: "You don't have a profile yet!",
        code: 'PRECONDITION_FAILED',
      });
    }

    if (!input.id) {
      throw new TRPCError({
        message: 'Submission not found',
        code: 'NOT_FOUND',
      });
    }

    const submission = await db.gameSubmission.update({
      where: {
        id: input.id,
        profileId: profile.id,
      },
      data: {
        slug: input.slug,
        title: input.title,
        headline: input.headline,
        projectType: input.projectType,
        externalWebsiteUrl: input.externalWebsiteUrl,
        viewport: input.viewport,
        viewportWidth: input.viewportWidth,
        viewportHeight: input.viewportHeight,
        devices: input.devices ?? [],
        orientations: input.orientations ?? [],
        description: input.description,
        instructions: input.instructions,
        category: input.category,
        tags: input.tags ?? [],
        trailerUrl: input.trailerUrl,
        markets: JSON.stringify(input.markets ?? {}),
        // file uploads are handled separately using the files router.
      },
    });

    if (!submission) {
      console.warn('Submission not found', input.id);
      throw new TRPCError({
        message: 'Submission not found',
        code: 'NOT_FOUND',
      });
    }

    return {
      okay: true,
    };
  });
