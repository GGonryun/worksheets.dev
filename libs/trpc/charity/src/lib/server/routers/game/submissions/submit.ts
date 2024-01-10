import { protectedProcedure } from '../../../procedures';
import { TRPCError } from '@trpc/server';
import { gameSubmissionFormSchema } from '@worksheets/ui/pages/game-submissions';
import { makeOptionalPropsNullable, z } from '@worksheets/zod';

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
  .mutation(async ({ input, ctx: { user, profile, db } }) => {
    console.info('Updating submission', {
      id: input.id,
      profileId: profile?.id,
    });

    if (!profile) {
      console.warn('No profile found for user', { userId: user.id });
      throw new TRPCError({
        message: "You don't have a profile yet!",
        code: 'PRECONDITION_FAILED',
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
        status: 'PENDING',
        markets: JSON.stringify(input.markets ?? {}),
        // file uploads are handled separately
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
