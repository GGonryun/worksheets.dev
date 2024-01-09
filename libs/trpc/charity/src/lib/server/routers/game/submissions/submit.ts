import { protectedProcedure } from '../../../procedures';
import { TRPCError } from '@trpc/server';
import { gameSubmissionFormSchema } from '@worksheets/ui/pages/game-submissions';
import { makeOptionalPropsNullable } from '@worksheets/zod';

export default protectedProcedure
  .input(makeOptionalPropsNullable(gameSubmissionFormSchema.partial()))
  .output(makeOptionalPropsNullable(gameSubmissionFormSchema.partial()))
  .mutation(async ({ input, ctx: { user, db } }) => {
    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
      },
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
        gameFileUrl: input.gameFileUrl,
        thumbnailUrl: input.thumbnailUrl,
        trailerUrl: input.trailerUrl,
        coverUrl: input.coverUrl,
        status: input.status ?? 'DRAFT',
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
      id: submission.id,
      slug: submission.slug,
      title: submission.title,
      headline: submission.headline,
      projectType: submission.projectType,
      externalWebsiteUrl: submission.externalWebsiteUrl,
      viewport: submission.viewport,
      viewportWidth: submission.viewportWidth,
      viewportHeight: submission.viewportHeight,
      devices: submission.devices,
      orientations: submission.orientations,
      description: submission.description,
      instructions: submission.instructions,
      category: submission.category,
      tags: submission.tags,
      gameFileUrl: submission.gameFileUrl,
      thumbnailUrl: submission.thumbnailUrl,
      trailerUrl: input.trailerUrl,
      coverUrl: submission.coverUrl,
      status: submission.status,
      profileId: submission.profileId,
      markets: JSON.parse(submission.markets ?? '{}'),
    };
  });
