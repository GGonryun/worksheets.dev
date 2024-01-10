import { protectedProcedure } from '../../../procedures';
import { z } from '@worksheets/zod';
import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import {
  GCP_CLIENT_EMAIL,
  GCP_SUBMISSION_BUCKET_ID,
  GCP_PRIVATE_KEY,
} from '@worksheets/ui/environment/server';
import { toMegabytes } from '@worksheets/util/data';

export default protectedProcedure
  .input(
    z.object({
      type: z.string(),
      name: z.string(),
      size: z.number(),
      submissionId: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
      fileId: z.string(),
      uploadUrl: z.string(),
    })
  )
  .mutation(
    async ({
      input: { type, name, submissionId, size },
      ctx: { user, db },
    }) => {
      console.info('preparing file upload', { type, name, submissionId });

      const storage = new Storage({
        credentials: {
          client_email: GCP_CLIENT_EMAIL,
          private_key: GCP_PRIVATE_KEY,
        },
      });

      const options: GetSignedUrlConfig = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 30 * 60 * 1000, // 30 minutes
        contentType: type,
      };

      const path = `uploads/${user.id}/${Date.now()}/${name}`;

      const [uploadUrl] = await storage
        .bucket(GCP_SUBMISSION_BUCKET_ID)
        .file(path)
        .getSignedUrl(options);

      const storedFile = await db.storedFile.create({
        data: {
          userId: user.id,
          submissionId,
          path,
          size: toMegabytes(size),
          type,
          name,
        },
      });

      console.info('prepared file upload', path);

      return {
        okay: true,
        fileId: storedFile.id,
        uploadUrl,
      };
    }
  );
