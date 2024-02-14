import { TRPCError } from '@trpc/server';
import { gameSubmissionFormSchema } from '@worksheets/util/types';
import { makeOptionalPropsNullable } from '@worksheets/zod';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';

export default protectedProcedure
  .input(
    z
      .object({
        id: z.string(),
      })
      .extend(
        makeOptionalPropsNullable(gameSubmissionFormSchema.partial()).shape
      )
  )
  .output(
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(async ({ input, ctx: { user, db } }) => {
    const userId = user.id;
    console.info('Submitting game submission', {
      id: input.id,
      userId,
    });

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
        status: 'PENDING',
        markets: JSON.stringify(input.markets ?? {}),
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
