import { TRPCError } from '@trpc/server';
import {
  GCP_BUCKET_ID,
  GCP_CDN_URL,
  GCP_GAME_SUBMISSION_BUCKET_ID,
} from '@worksheets/services/environment';
import ratelimit from '@worksheets/services/ratelimit';
import * as storage from '@worksheets/services/storage';
import { randomUUID } from '@worksheets/util/crypto';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  upload: protectedProcedure
    .input(
      z.object({
        type: z.string(),
      })
    )
    .output(
      z.object({
        publicUrl: z.string(),
        uploadUrl: z.string(),
      })
    )
    .mutation(async ({ input: { type }, ctx: { user } }) => {
      const { success } = await ratelimit.uploads.limit(user.id);
      if (!success) {
        // console.error('Rate limit exceeded for file uploads', user.id);
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message:
            'Too many file uploads have been requested in the last hour. Please try again later.',
        });
      }

      const id = randomUUID();
      const [classification, extension] = type.split('/');
      const file = `${id}.${extension}`;
      const path = `${classification}/${file}`;

      const uploadUrl = await storage.getSignedUrl({
        // TODO: maybe in the future not all zip files should be game submissions
        bucket:
          extension === 'zip' ? GCP_GAME_SUBMISSION_BUCKET_ID : GCP_BUCKET_ID,
        path,
        contentType: type,
      });

      const publicUrl = `${GCP_CDN_URL}/${path}`;

      return {
        uploadUrl,
        publicUrl,
      };
    }),
});
