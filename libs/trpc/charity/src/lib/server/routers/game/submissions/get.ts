import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../../procedures';
import { TRPCError } from '@trpc/server';
import {
  GameSubmissionForm,
  storedFileSchema,
} from '@worksheets/ui/pages/game-submissions';
import { Nullable } from '@worksheets/util/types';
import { createFileDownloadUrl } from '@worksheets/ui/environment/server';
import { StoredFileModel } from '@worksheets/prisma';
export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(z.custom<Nullable<GameSubmissionForm>>())
  .query(async ({ input: { id }, ctx: { user, profile, db } }) => {
    console.info('Getting submission', { id, profileId: profile?.id });

    if (!profile) {
      console.warn('No profile found for user', { userId: user.id });
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
      include: {
        gameFile: true,
        thumbnailFile: true,
        coverFile: true,
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
      gameFile: safelyCreateFile(submission.gameFile),
      thumbnailFile: safelyCreateFile(submission.thumbnailFile),
      coverFile: safelyCreateFile(submission.coverFile),
      trailerUrl: submission.trailerUrl,
      status: submission.status,
      profileId: submission.profileId,
      markets: JSON.parse(submission.markets ?? '{}'),
    };
  });

type DatabaseStoredFile = z.infer<typeof StoredFileModel>;
type FormStoredFile = z.infer<typeof storedFileSchema>;

const safelyCreateFile = (
  file: DatabaseStoredFile | null
): FormStoredFile | null =>
  file
    ? {
        fileId: file.id,
        url: createFileDownloadUrl(file.path),
        type: file.type,
        name: file.name,
        size: file.size,
        timestamp: file.timestamp,
      }
    : null;
