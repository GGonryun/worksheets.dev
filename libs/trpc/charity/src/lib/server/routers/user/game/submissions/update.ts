import { TRPCError } from '@trpc/server';
import { GameSubmissionForm, Nullable } from '@worksheets/util/types';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  // removes form validation on server side
  .input(z.custom<Nullable<GameSubmissionForm> & { id: string }>())
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input, ctx: { user, db } }) => {
    const userId = user.id;
    console.info('Updating submission', {
      id: input.id,
      userId,
    });

    if (!input.id) {
      throw new TRPCError({
        message: 'Submission not found',
        code: 'NOT_FOUND',
      });
    }

    const submission = await db.gameSubmission.update({
      where: {
        id: input.id,
        userId,
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
        categories: input.categories ?? [],
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
