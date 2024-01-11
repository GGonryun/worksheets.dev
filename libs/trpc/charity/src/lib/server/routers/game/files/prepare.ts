import { protectedProcedure } from '../../../procedures';
import { z } from '@worksheets/zod';

import { toMegabytes } from '@worksheets/util/data';
import * as storage from '@worksheets/services/storage';

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

      const path = `uploads/${user.id}/${Date.now()}/${name}`;

      const uploadUrl = await storage.getSignedUrl({
        path,
        contentType: type,
      });

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
