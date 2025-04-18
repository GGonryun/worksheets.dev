import { GCP_CDN_URL } from '@worksheets/services/environment';
import * as storage from '@worksheets/services/storage';
import { randomUUID } from '@worksheets/util/crypto';
import { toMegabytes } from '@worksheets/util/data';
import { z } from 'zod';

import { protectedProcedure } from '../../../../procedures';
import { t } from '../../../../trpc';

export default t.router({
  prepare: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        size: z.number(),
        name: z.string(),
        teamId: z.string(),
      })
    )
    .output(
      z.object({
        fileId: z.string(),
        publicUrl: z.string(),
        uploadUrl: z.string(),
      })
    )
    .mutation(
      async ({ input: { type, size, name, teamId }, ctx: { user, db } }) => {
        const id = randomUUID();
        const [, extension] = type.split('/');
        const path = `_images/${id}.${extension}`;

        const uploadUrl = await storage.getSignedUrl({
          path,
          contentType: type,
        });

        const publicUrl = `${GCP_CDN_URL}/${path}`;

        const storedFile = await db.storedFile.create({
          data: {
            userId: user.id,
            teamId: teamId,
            url: publicUrl,
            status: 'PENDING',
            path,
            size: toMegabytes(size),
            type,
            name,
          },
        });

        console.info('prepared file upload', path);

        return {
          fileId: storedFile.id,
          uploadUrl,
          publicUrl,
        };
      }
    ),
  complete: protectedProcedure
    .input(
      z.object({
        fileId: z.string(),
      })
    )
    .mutation(async ({ input: { fileId }, ctx: { db } }) => {
      await db.storedFile.update({
        where: {
          id: fileId,
        },
        data: {
          status: 'DONE',
        },
      });
    }),
});
