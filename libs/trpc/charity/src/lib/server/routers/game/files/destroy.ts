import { TRPCError } from '@trpc/server';
import { protectedProcedure } from '../../../procedures';
import { z } from '@worksheets/zod';
import { Storage } from '@google-cloud/storage';
import {
  GCP_CLIENT_EMAIL,
  GCP_SUBMISSION_BUCKET_ID,
  GCP_PRIVATE_KEY,
} from '@worksheets/ui/environment/server';

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

      const storage = new Storage({
        credentials: {
          client_email: GCP_CLIENT_EMAIL,
          private_key: GCP_PRIVATE_KEY,
        },
      });

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

      // 1. delete from GCP
      try {
        await storage.bucket(GCP_SUBMISSION_BUCKET_ID).file(file.path).delete();
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

      // 3. remove from submission
      console.info('TODO: update file submission', {
        submissionId,
        fieldId,
        fileId,
      });

      return {
        okay: true,
      };
    }
  );
