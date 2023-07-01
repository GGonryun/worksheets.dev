import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';
import { tokens } from '@worksheets/feat/user-management';
import { addDaysToCurrentTime } from '@worksheets/util/time';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'PUT',
      path: '/user/tokens',
      summary: 'Create a new API token',
      tags: ['user'],
    },
  })
  .input(
    z.object({
      name: z.string().nonempty(),
      expiresInDays: z.number().describe('expires in days from now'),
    })
  )
  .output(z.string())
  .mutation(
    async ({
      input: { name, expiresInDays },
      ctx: {
        user: { uid },
      },
    }) => {
      return await tokens.create({
        name,
        uid,
        expires: addDaysToCurrentTime(expiresInDays).getTime(),
      });
    }
  );
