import { TRPCError } from '@trpc/server';
import { createFileDownloadUrl } from '@worksheets/services/environment';
import { FILE_ID_FIELD_MAP, storedFileSchema } from '@worksheets/util/types';
import { z } from '@worksheets/zod';

import { protectedProcedure } from '../../../procedures';

export default protectedProcedure
  .input(
    z.object({
      submissionId: z.string(),
      fieldId: z.union([
        z.literal('gameFile'),
        z.literal('coverFile'),
        z.literal('thumbnailFile'),
      ]),
      fileId: z.string(),
    })
  )
  .output(
    z.union([
      z
        .object({
          okay: z.literal(true),
        })
        .extend(storedFileSchema.shape),
      z.object({
        okay: z.literal(false),
      }),
    ])
  )
  .mutation(
    async ({ input: { submissionId, fieldId, fileId }, ctx: { user, db } }) => {
      console.info('completing file upload', { submissionId, fieldId, fileId });

      const file = await db.storedFile.findFirst({
        where: {
          id: fileId,
          userId: user.id,
        },
      });

      if (!file) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'File not found',
        });
      }

      // TODO: move to a model where we create signed request urls for reading files.
      const downloadUrl = createFileDownloadUrl(file.path);

      await db.gameSubmission.update({
        where: {
          id: submissionId,
        },
        data: {
          [FILE_ID_FIELD_MAP[fieldId]]: fileId,
        },
      });

      return {
        okay: true,
        fileId: file.id,
        url: downloadUrl,
        type: file.type,
        size: file.size,
        name: file.name,
        timestamp: file.createdAt.getTime(),
      };
    }
  );
