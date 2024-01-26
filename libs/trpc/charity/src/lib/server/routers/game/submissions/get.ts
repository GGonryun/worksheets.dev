import { TRPCError } from '@trpc/server';
import { createFileDownloadUrl } from '@worksheets/services/environment';
import {
  GameSubmissionForm,
  Nullable,
  storedFileSchema,
} from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';
export default protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(z.custom<Nullable<GameSubmissionForm>>())
  .query(async ({ input: { id }, ctx: { user, db } }) => {
    const userId = user.id;

    console.info('Getting submission', { id, userId });

    const submission = await db.gameSubmission.findUnique({
      where: {
        id,
        userId,
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

    console.info(`found submission`, { submissionId: submission.id });

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
      userId: submission.userId,
      markets: JSON.parse(submission.markets ?? '{}'),
    };
  });

const StoredFileModel = z.object({
  id: z.string(),
  path: z.string(),
  size: z.number(),
  type: z.string(),
  name: z.string(),
  createdAt: z.date(),
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
        timestamp: file.createdAt.getTime(),
      }
    : null;
