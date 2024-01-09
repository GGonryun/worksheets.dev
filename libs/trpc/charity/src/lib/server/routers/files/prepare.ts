import { protectedProcedure } from '../../procedures';
import { z } from '@worksheets/zod';
import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';

const { GCP_CLIENT_EMAIL, GCP_PRIVATE_KEY, GCP_FILE_BUCKET, GCP_CDN } =
  process.env;

if (!GCP_CLIENT_EMAIL) {
  throw new Error('Missing GCP_CLIENT_EMAIL');
}

if (!GCP_PRIVATE_KEY) {
  throw new Error('Missing GCP_PRIVATE_KEY');
}

if (!GCP_FILE_BUCKET) {
  throw new Error('Missing GCP_FILE_BUCKET');
}

if (!GCP_CDN) {
  throw new Error('Missing GCP_CDN');
}

export default protectedProcedure
  .input(
    z.object({
      type: z.string(),
      name: z.string(),
      submissionId: z.string(),
    })
  )
  .output(
    z.object({
      okay: z.boolean(),
      id: z.string(),
      uploadUrl: z.string(),
      downloadUrl: z.string(),
    })
  )
  .mutation(
    async ({ input: { type, name, submissionId }, ctx: { user, db } }) => {
      const storage = new Storage({
        credentials: {
          client_email: GCP_CLIENT_EMAIL,
          private_key: GCP_PRIVATE_KEY,
        },
      });

      const options: GetSignedUrlConfig = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: type,
      };

      const path = `${user.id}/uploads/${Date.now()}/${name}`;

      const [uploadUrl] = await storage
        .bucket(GCP_FILE_BUCKET)
        .file(path)
        .getSignedUrl(options);

      const downloadUrl = `${GCP_CDN}/${path}`;

      const storedFile = await db.storedFile.create({
        data: {
          submissionId,
          userId: user.id,
          url: downloadUrl,
        },
      });

      return {
        okay: true,
        id: storedFile.id,
        uploadUrl,
        downloadUrl,
      };
    }
  );
