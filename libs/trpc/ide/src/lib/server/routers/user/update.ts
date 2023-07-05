import { z } from 'zod';
import { protectedProcedure } from '../../trpc';
import { quotas } from '@worksheets/feat/user-management';

export default protectedProcedure
  .meta({
    openapi: {
      enabled: true,
      protect: true,
      method: 'POST',
      path: '/user',
      summary: 'Update the user',
      tags: ['user'],
    },
  })
  .input(
    z.object({
      overclock: z.boolean(),
    })
  )
  .output(z.boolean())
  .mutation(async ({ input, ctx: { user } }) => {
    await quotas.update(user.uid, input);

    return true;
  });
