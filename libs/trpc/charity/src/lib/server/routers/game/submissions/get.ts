import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';
import { TRPCError } from '@trpc/server';
import { GameSubmissionForm } from '@worksheets/ui/pages/game-submissions';
import { Nullable } from '@worksheets/util/types';

export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(z.custom<Nullable<GameSubmissionForm>>())
  .query(async ({ input: { id }, ctx: { user, db } }) => {
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

    const submission = await db.gameSubmission.findUnique({
      where: {
        id,
        profileId: profile.id,
      },
    });

    if (!submission) {
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
      devices: submission.devices ?? [],
      orientations: submission.orientations ?? [],
      description: submission.description,
      instructions: submission.instructions,
      category: submission.category,
      tags: submission.tags,
      gameFileUrl: submission.gameFileUrl,
      thumbnailUrl: submission.thumbnailUrl,
      trailerUrl: submission.trailerUrl,
      coverUrl: submission.coverUrl,
      status: submission.status,
      profileId: submission.profileId,
      markets: JSON.parse(submission.markets ?? '{}'),
    };
  });
