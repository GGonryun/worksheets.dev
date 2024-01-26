import { TRPCError } from '@trpc/server';
import * as storage from '@worksheets/services/storage';
import { FILE_ID_FIELD_MAP } from '@worksheets/util/types';
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
    z.object({
      okay: z.boolean(),
    })
  )
  .mutation(
    async ({ input: { fileId, fieldId, submissionId }, ctx: { user, db } }) => {
      console.info('destroying file', { fileId, fieldId, submissionId });

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

      try {
        // 1. delete from GCP
        await storage.deleteFile(file.path);
      } catch (error) {
        // TODO: log this somewhere else so we can retry or handle manually.
        console.error('Error deleting file from GCP', error);
      }

      // 2. delete from DB
      await db.storedFile.delete({
        where: {
          id: file.id,
        },
      });

      // 3. update submission
      await db.gameSubmission.update({
        where: {
          id: submissionId,
        },
        data: {
          [FILE_ID_FIELD_MAP[fieldId]]: null,
        },
      });

      return {
        okay: true,
      };
    }
  );
